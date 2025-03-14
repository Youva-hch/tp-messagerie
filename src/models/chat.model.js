import Joi from "joi";
import mongoose from "mongoose";

const chatSchema = new mongoose.Schema ({
    id: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: String
    },
    heure: {
        type: String
    }
})

const Chat = mongoose.model("Chat", chatSchema)

const chatValidation = Joi.object({
    id: Joi.string()
        .required()
        .messages({
            "string.base": "L'ID doit être une chaine de caractères.",
            "any.required": "L'ID est obligatoire."
        }),
    
    name: Joi.string()
        .required()
        .messages({
            "string.base": "Le nom doit être une chaine de caractères.",
            "any.required": "Le nom est obligatoire."
        }),

    message: Joi.string()
        .min(1) // Pour envoyer de mettre un message vide
        .required()
        .messages({
            "string.base": "Le message doit être une chaine de caractères.",
            "tring.patternbase": "La date n'est pas au bon format soit JJ/MM/AAAA.",
            "any.required": "Le message est obligatoire."
        }),

    date: Joi.string()
        .pattern(/^\d{2}\/\d{2}\/\d{4}$/) // Le format JJ/MM/AAAA en question trouvé sur internet
        .required()
        .messages({
            "string.base": "La date doit être une chaine de caractères.",
            "string.pattern.base": "La date doit être au format JJ/MM/AAAA.",
            "any.required": "La date est obligatoire"
        }),
})
export { Chat, chatValidation }
