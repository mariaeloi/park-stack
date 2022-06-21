const AttractionRepository = require('../repositories/AttractionRepository');
const { responseCreated, responseBadRequest, responseOk } = require('../utils/response');
const msg = require('../constants/messages');

class AttractionService {
    async save(attraction) {
        let errors = new Object();

        const attractionByCode = await AttractionRepository.findByCode(attraction.code);
        if(attractionByCode) {
            errors.code = msg.attraction.codeExists;
        }
        const attractionByName = await AttractionRepository.findByName(attraction.name);
        if(attractionByName) {
            errors.name = msg.attraction.nameExists;
        }

        if(Object.keys(errors).length !== 0) {
            return responseBadRequest(msg.attraction.createError, errors);
        }
        
        const attractionReturn = await AttractionRepository.save(attraction);
        return responseCreated(attractionReturn, msg.attraction.createOk);
    }

    async findById(id) {
        const attraction = await AttractionRepository.findById(id);

        if(!attraction) {
            return responseBadRequest(msg.attraction.searchError);
        }

        return responseOk(attraction);
    }
}

module.exports = new AttractionService();