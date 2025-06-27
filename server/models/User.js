import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // _id: { type: String, required: false},
    
    username: {
      type: String,
      required: false, // will default to email
    },
    
    email: { type: String, required: true, unique: true },

    password: {
      type: String,
      required: true,
    },
    
    image: {
      type: String, // optional
    },
    
    role: {
      type: String,
      default: "user",
    },
    
    recentSearchedCities: [{
      type: String,
    }],
  },
  { timestamps: true }
);

// Pre-save: default username to email if not set
userSchema.pre("save", function (next) {
  if (!this.username) {
    this.username = this.email;
  }
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
