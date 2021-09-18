import equipments from '../../data.json';

const store = {
    getAll: () => {
        return equipments;
    },

    getPage: (paga, size) => {
        // ToDo: simulate pagination ...
    }
};

export default store;