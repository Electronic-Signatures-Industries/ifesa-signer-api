module.exports = mongoose => {
    const Sign = mongoose.model(
      "sign",
      mongoose.Schema(
        {
          name: String,
          idDoc: String,
        },
        { timestamps: true }
      )
    );
  
    return Sign;
  };