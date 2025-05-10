import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApiService from "../../services/ApiService";
import Modal from "./Modal";
import styles from "./Photos.module.css";

const Photos = ({ setShowAlbums }) => {
    const [photos, setPhotos] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [error, setError] = useState("");
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editedPhoto, setEditedPhoto] = useState(null);
    const [editedTitle, setEditedTitle] = useState("");
    const [newPhoto, setNewPhoto] = useState({ url: "", title: "" });

    const initialLoad = useRef(true);
    const { albumId } = useParams();
    const navigate = useNavigate();

    const PHOTOS_PER_PAGE = 6;

    const fetchMorePhotos = async () => {
        if (loading || !hasMore) return;
        setLoading(true);
        try {
            const response = await ApiService.request({
                url: `http://localhost:3000/albums/${albumId}/photos?_start=${offset}&_limit=${PHOTOS_PER_PAGE}`,
            });
            const data = response.photos || [];
            if (data.length === 0) {
                setHasMore(false);
            } else {
                setPhotos((prev) => {
                    const newPhotos = data.filter(
                        (newPhoto) => !prev.some((photo) => photo.id === newPhoto.id)
                    );
                    return [...prev, ...newPhotos];
                });
                setOffset((prev) => prev + PHOTOS_PER_PAGE);
            }
        } catch (err) {
            setError("Failed to fetch photos.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (initialLoad.current) {
            initialLoad.current = false;
            fetchMorePhotos();
        }
    }, [albumId]);

    const handleAddPhoto = async () => {
        try {
            const duplicate = photos.some((photo) => photo.url === newPhoto.url);
            if (duplicate) {
                setError("Photo already exists.");
                return;
            }
            const photoToAdd = {
                albumId: parseInt(albumId),
                title: newPhoto.title,
                url: newPhoto.url,
            };
            const savedPhoto = await ApiService.request({
                url: `http://localhost:3000/albums/${albumId}/photos`,
                method: "POST",
                body: photoToAdd,
            });
            setPhotos((prev) => [savedPhoto, ...prev]);
            setNewPhoto({ url: "", title: "" });
            setIsAdding(false);
        } catch (err) {
            setError("Failed to add photo.");
        }
    };

    const handleDeletePhoto = async (id) => {
        try {
            await ApiService.request({
                url: `http://localhost:3000/albums/${albumId}/photos/${id}`,
                method: "DELETE",
            });

            setPhotos((prev) => prev.filter((photo) => photo.id !== id));
        } catch (err) {
            setError("Failed to delete photo.");
        }
    };

    const handleEditPhoto = async () => {
        try {
            await ApiService.request({
                url: `http://localhost:3000/albums/${albumId}/photos/${editedPhoto.id}`,
                method: "PUT",
                body: { title: editedTitle },
            });

            setPhotos((prev) =>
                prev.map((photo) =>
                    photo.id === editedPhoto.id ? { ...photo, title: editedTitle } : photo
                )
            );
            setIsEditing(false);
        } catch (err) {
            setError("Failed to edit photo.");
        }
    };

    const backToAlbums = () => {
        navigate(-1);
        setShowAlbums(true);
    }

    return (
        <div className={styles.photosContainer}>
            <Modal
                isOpen={isEditing}
                onClose={() => setIsEditing(false)}
                onSave={handleEditPhoto}
                currentTitle={editedTitle}
                setEditedTitle={setEditedTitle}
            />
            <div className={styles.photosHeader}>
                <h2>Photos</h2>
                <button
                    className={styles.backButton}
                    onClick={backToAlbums}
                >
                    ← Back to Albums
                </button>
                <button className={styles.addButton} onClick={() => setIsAdding(!isAdding)}>
                    + Add Photo
                </button>
            </div>
            {isAdding && (
                <div className={styles.addPhotoForm}>
                    <input
                        type="text"
                        value={newPhoto.url}
                        onChange={(e) => setNewPhoto((prev) => ({ ...prev, url: e.target.value }))}
                        placeholder="Enter photo URL"
                    />
                    <input
                        type="text"
                        value={newPhoto.title}
                        onChange={(e) => setNewPhoto((prev) => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter photo title"
                    />
                    <button onClick={handleAddPhoto}>Save</button>
                    <button onClick={() => setIsAdding(false)}>Cancel</button>
                </div>
            )}

            {error && <p className={styles.errorMessage}>{error}</p>}

            <div className={styles.photosGrid}>
                {photos.length !=0 ?
                    (photos.map((photo) => (
                        <div key={photo.id} className={styles.photoCard}>
                            <img src={photo.thumbnailUrl} alt={photo.title} />
                            <div className={styles.photoOverlay}>
                                <p>{photo.title}</p>
                                <button
                                    className={styles.editButton}
                                    onClick={() => {
                                        setEditedPhoto(photo);
                                        setEditedTitle(photo.title);
                                        setIsEditing(true);
                                    }}
                                >
                                    ✏️
                                </button>
                                <button
                                    className={styles.deleteButton}
                                    onClick={() => handleDeletePhoto(photo.id)}
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    )))
                    : (
                        <p className={styles.noMorePhotos}>No photos available.</p>
                    )}
            </div>

            {hasMore && (
                <button
                    className={styles.loadMoreButton}
                    onClick={fetchMorePhotos}
                    disabled={loading}
                >
                    {loading ? "Loading..." : "Load More Photos"}
                </button>
            )}
            {(!hasMore && photos.length!=0) && <p className={styles.noMorePhotos}>No more photos available.</p>}
        </div>
    );
};

export default Photos;
