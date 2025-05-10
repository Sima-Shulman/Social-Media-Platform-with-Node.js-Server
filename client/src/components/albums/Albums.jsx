import React, { useEffect, useState } from "react";
import ApiService from "../../services/ApiService";
import { useNavigate, Routes, Route } from "react-router-dom";
import { useUser } from "../../services/UserContext";
import SearchService from "../../services/SearchService";
import Photos from "./Photos";
import styles from "./Albums.module.css";

const Albums = () => {
    const [albums, setAlbums] = useState([]);
    const [filteredAlbums, setFilteredAlbums] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [criteria, setCriteria] = useState("");
    const [isAdding, setIsAdding] = useState(false);
    const [showAlbums, setShowAlbums] = useState(true);
    const [newAlbumTitle, setNewAlbumTitle] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const { currentUser } = useUser();

    useEffect(() => {
        const fetchAlbums = async () => {
            if (!currentUser?.id) {
                return;
            }
            const lastPath = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
            if (lastPath !== 'albums' && lastPath !== 'photos') {
                navigate("/NotFound");
            }
            if (lastPath === 'photos') {
                setShowAlbums(false);
            }
            try {
                const data = await ApiService.request({
                    url: `http://localhost:3000/albums/?userId=${currentUser.id}`,
                });
                setAlbums(data);
                setFilteredAlbums(data);
            } catch (err) {
                setError("Failed to fetch albums.");
            }
        };

        fetchAlbums();
    }, [currentUser?.id]);

    const handleAddAlbum = async () => {
        try {
            const newAlbum = {
                userId: currentUser.id,
                title: newAlbumTitle
            };
            const savedAlbum = await ApiService.request({
                url: "http://localhost:3000/albums",
                method: "POST",
                body: newAlbum,
            });
            setAlbums((prev) => [savedAlbum, ...prev]);
            setFilteredAlbums((prev) => [savedAlbum, ...prev]);
            setIsAdding(false);
            setNewAlbumTitle("");
        } catch (err) {
            setError("Failed to add album.");
        }
    };

    const handleSearch = (searchQuery) => {
        setSearchQuery(searchQuery);
        if (!criteria) {
            setError("Please select a search criteria.");
            return;
        }
        setError("");
        setFilteredAlbums(SearchService.filterItems(searchQuery, albums, criteria));
    };

    return (
        <>
            {showAlbums ? (
                <div className={styles.albumsContainer}>
                    <div className={styles.albumsHeader}>
                        <h2>Albums</h2>
                        <button
                            className={styles.addButton}
                            onClick={() => setIsAdding(!isAdding)}
                        >
                            + Add Album
                        </button>
                    </div>

                    {isAdding && (
                        <div className={styles.addAlbumForm}>
                            <input
                                type="text"
                                value={newAlbumTitle}
                                onChange={(e) => setNewAlbumTitle(e.target.value)}
                                placeholder="Enter album title"
                            />
                            <button onClick={handleAddAlbum}>Save</button>
                            <button onClick={() => setIsAdding(false)}>Cancel</button>
                        </div>
                    )}

                    <div className={styles.searchBar}>
                        <select
                            value={criteria}
                            onChange={(e) => setCriteria(e.target.value)}
                        >
                            <option value="">Select criteria</option>
                            <option value="id">ID</option>
                            <option value="title">Title</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Search albums"
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </div>
                    {error && <p className={styles.errorMessage}>{error}</p>}
                    <div className={styles.albumsGrid}>
                        {filteredAlbums ?
                            (filteredAlbums.map((album) => (
                                <div
                                    key={album.id}
                                    className={styles.albumCard}
                                    onClick={() => {
                                        setShowAlbums(false);
                                        navigate(`${album.id}/photos`);
                                    }}
                                >
                                    <p>
                                        <strong>ID:</strong> {album.id}
                                    </p>
                                    <p>
                                        <strong>Title:</strong> {album.title}
                                    </p>
                                </div>
                            )))
                            : (
                                <p className={styles.noAlbumsMessage}>No albums found.</p>
                            )}
                    </div>
                </div>
            ) : (
                <Routes>
                    <Route
                        path=":albumId/photos"
                        element={<Photos setShowAlbums={setShowAlbums} />}
                    />
                </Routes>
            )}
        </>
    );
};

export default Albums;
