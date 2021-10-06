const resetButtonHandler = async (event) => {
    const user = await user.findOne({ email });

    if (!user) {
        alert ('This user does not exist')
        return false;
    }
}

let id = await id.findOne ({ userId: user._id })

if (id) {
    await id.deleteOne()
};

let resetId = crypto.randomBytes(32).toString("hex");

const requestPasswordReset = async (event) => {
    
}