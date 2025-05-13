const {queryAllUsers, queryUserByUsername, queryUserById, postUser,queryUserPassword /*putUser, deleteUser*/} = require('../service/userService');
exports.getAllUsers = async (req, res) => {
    try {
        const { username ,password} = req.query;

        if (username) {
            const user = await queryUserByUsername(username);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            if(password){
                let jsonPassword = await queryUserPassword(user.id);
                if (!jsonPassword||password!=jsonPassword.password) {
                    return res.status(404).json({ error: 'wrong details ' });                }
                return res.status(200).json({user});
            }
            return res.status(200).json(user);
        }

        const users = await queryAllUsers();
        if (!users || users.length === 0) {
            return res.status(404).json({ error: 'No users found' });
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error. ' + error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await queryUserById(id);
        if (!user || user.length === 0) {
            return res.status(404).json({ error: 'User with id:' + id + ' not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.'+error.message });
    }
}
exports.createUser = async (req, res) => {
    try {
        const user = await postUser(req.body);
        if (!user || user.length === 0) {
            return res.status(404).json({ error: 'User with username:' + user.username + ' cannot be created' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.'+error.message });
    }
}
exports.updateUser = async (req, res) => {
    try {
        const id = req.params.id
        const isUpdate = await putUser(id, req.body);
        if (!isUpdate) {
            return res.status(404).json({ error: 'User with id:' + user.id + ' not found' });
        }
        res.status(200).json('user' + id + ' updated');
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.'+error.message });
    }
}
exports.removeUser = async (req, res) => {
    try {
        const id = req.params.id
        const isDelete = await deleteUser(id);
        if (!isDelete) {
            return res.status(404).json({ error: 'User with id:' + user.id + ' not found' });
        }
        res.status(200).json('user' + id + ' deleted');
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.'+error.message });
    }
}