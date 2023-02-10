module.exports = (mongoose, mongoosePaginate) => {
    var schema = mongoose.Schema({
        image: String,
        title: String,
        text: String,        
        author: String,
        date: Date,
        likes: Number,
        published: Boolean,
    }, { timestamps: true });

    schema.plugin(mongoosePaginate);

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Comment = mongoose.model(
        "comment",
        schema
    );

    return Comment;
};