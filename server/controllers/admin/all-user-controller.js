const User = require('../../models/User');

// Get all client users (role: "user")
const getAllClients = async (req, res) => {
    try {
        const users = await User.find({ role: "user" }).select("-password"); // exclude password
        res.status(200).json({
            success: true,
            message: "Fetched all client users",
            data: users
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

module.exports = { getAllClients };
