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


    //Aquí la clave es poner schema.statics, de esa manera el controlador puede hacer uso de GetSortedAndPaged
    schema.statics.GetSortedAndPaged = function(skip, limit, maxDate) {
        const query = Comment.find();
        let x = query.skip(skip).limit(limit).sort({ "createdAt": -1 });
        if (maxDate) {
            x = x.where("createdAt").lte(new Date(maxDate))
        }
        let y = x.exec()
        return y;
    }

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