
import data from '../../data.json';

const equipments = [...data];

/*
    The rental item model:
    {
        product: object     // An equipment instance
        from: string
        to: string
    }
*/
const rentals = [];

const store = {
    // Suppose the "code" field is the unique identifier of the equipment entity
    getOne: (code) => {
        const results = equipments.filter((equipment) => {
            return `${equipment['code']}` === `${code}`;
        });
        return results[0] ? results[0] : null;
    },

    // Just implement the simplest CONTAINing search logic on the "name" field, no case sensitive.
    search: (keyword) => {
        if (`${keyword}` === "undefined" || `${keyword.trim()}` === "") {
            return equipments;
        } else {
            const results = equipments.filter( (equipment) => {
                // return equipment;
                return `${equipment['name']}`.toLowerCase().includes(`${keyword}`.toLowerCase());
            } );
            return results;
        }
    },

    // No data consistent validation because we don;t know the equipment creteria
    update: (obj) => {
        let idx;
        for (let i = 0; i < equipments.length; i++) {
            if (`${equipments[i]['code']}` === `${obj['code']}`) {
                idx = i;
                break;
            }
        }

        if (`${idx}` !== "undefined") {
            // Make it work for PATCH
            const newObj = { ...equipments[idx], ...obj };
            equipments.splice(idx, 1, newObj);
            return newObj;
        } else {
            return null;
        }
    },

    rent: (equipment, from, to) => {
        rentals.push(
            {
                product: equipment,
                from: from,
                to: to
            }
        );
    },

    getRentals: () => {
        return [...rentals];
    },

    return: (rental) => {
        let idx;
        for (let i = 0; i < rentals.length; i++) {
            if (`${rentals[i]['product']['code']}` === `${rental['product']['code']}`) {
                idx = i;
                break;
            }
        }

        if (`${idx}` !== "undefined") {
            rentals.splice(idx, 1);
        }
    }
};

export default store;