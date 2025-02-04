const express = require('express');
const { User } = require('../sequelize/models/user')

const getAllUsers = async (req, res) => {
    if (req.user.role !== 'Admin') return res.status(403).json({ message: 'Forbidden' })
    
        try {
            const users = await User.findAll();
            if (!users) {
                return res.status(404).json({ message: 'No users found' });
            }
            res.json(users)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error: error})
        }
}

const getUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user)
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error });
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    await user.update(req.body);
    res.json({ message: 'User successfully updated', user: user })
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    if (req.user.role !== 'Admin') return res.status(403).json({ message: 'Forbidden' });

    try {
        const user = await User.findByPk(id)
        if (!user){
            return res.status(404).json({ message: 'User not found' });
        }
        await user.destroy();
        res.json({ message: 'User successfully deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error });
    }
}


module.exports = {
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
}