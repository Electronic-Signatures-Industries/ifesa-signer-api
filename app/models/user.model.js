module.exports = mongoose => {
    const User = mongoose.model(
      "user",
      mongoose.Schema(
        {
          name: String,
          idDoc: String,
        },
        { timestamps: true }
      )
    );
  
    return User;
  };