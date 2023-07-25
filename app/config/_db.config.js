const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://luis:MaGCkhkqvzvE0lR3@cluster0.beraluh.mongodb.net/sign?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, function(err) {
    if (err) {
        console.error(err);
    } else {
        console.log('Connected');
    }    
});

const signSchema = new mongoose.Schema({
  name: String,
  idDoc: String,
});

const Sign = mongoose.model('sign', signSchema);

module.exports = {
  getSigns: async () => {
    console.log('getSigns');
    const signs = await Sign.find({});
    return signs;
  },
  createSign: async (sign) => {
    const newSign = new Sign(sign);
    await newSign.save();
    return newSign;
  },
  updateSign: async (id, sign) => {
    const signToUpdate = await Sign.findById(id);
    signToUpdate.name = sign.name;
    signToUpdate.idDoc = sign.idDoc;
    await signToUpdate.save();
    return signToUpdate;
  },
  deleteSign: async (id) => {
    await Sign.deleteOne({ _id: id });
  },
};