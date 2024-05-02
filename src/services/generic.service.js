class GenericService {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
            return await this.model.create(data);
        } catch (error) {
            console.error('Error creating object:', error);
            throw error;
        }
    }

    async update(filter, data) {
        try {
            return await this.model.findOneAndUpdate(filter, data, { new: true }).select('-__v -updatedAt -deleted');
        } catch (error) {
            console.error('Error updating object:', error);
            throw error;
        }
    }

    async delete(filter) {
        try {
            return await this.model.findOneAndDelete(filter);
        } catch (error) {
            console.error('Error deleting object:', error);
            throw error;
        }
    }

    async find(filter) {
        try {
            filter = { deleted: false, ...filter };
            return await this.model.findOne(filter).select('-__v -updatedAt -deleted');
        } catch (error) {
            console.error('Error finding object:', error);
            throw error;
        }
    }

    async search(filter) {
        try {
            const page = filter?.page ? parseInt(filter?.page) : 1;
            const perPage = filter?.limit ? parseInt(filter?.limit) : 0;

            delete filter?.page;
            delete filter?.limit;

            let data = [];
            let totalCount;

            if (filter) {
                filter = filter?.deleted ? filter : filter.hasOwnProperty('deleted') ? filter : { deleted: false, ...filter };

                totalCount = await this.model.countDocuments(filter);
                data = await this.model.find(filter)
                    .skip((page - 1) * perPage)
                    .limit(perPage)
                    .sort({ createdAt: -1 })
                    .select('-__v -updatedAt -deleted');
            } else {
                totalCount = await this.model.countDocuments({ deleted: false });
                data = await this.model.find({ deleted: false })
                    .skip((page - 1) * perPage)
                    .limit(perPage)
                    .sort({ createdAt: 1 })
                    .select('-__v -updatedAt -deleted');
            }

            return {
                data,
                currentPage: page,
                totalPages: Math.ceil(totalCount / perPage)
            };
        } catch (error) {
            console.error('Error searching objects:', error);
            throw error;
        }
    }
}

export default GenericService;
