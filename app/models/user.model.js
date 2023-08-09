module.exports = mongoose => {
    const User = mongoose.model(
      "user",
      mongoose.Schema(
        {
          name: String,
          idDoc: String,
          plan: Number
        },
        { timestamps: true }
      )
    );
  
    return User;
  };