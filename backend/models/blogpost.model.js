import mongoose from "mongoose";

const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    featureImage: {
      type: String,
    },
  },
  { timestamps: true }
);

blogPostSchema.pre('find', function() {
  this.populate('owner'); 
});

export const BlogPost = mongoose.model("BlogPost", blogPostSchema);
