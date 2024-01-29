// trelloServerWorkspace.js
// Made by Yoann Raton, 24/01/2024

import RequestInventory from './requestInventory.js';

class TrelloServerWorkspace {

    constructor(config) {
        this.name = "name";
        this.config = config;
        this.rqtInv = new RequestInventory();
    }

    boardModifiedRule(boardID) {

        //Logic for board modified
    }

    listAddedToBoardRule(listID, boardID) {

        //Logic for list add
    }

    listModifiedInBoardRule(listID, boardID) {

        //Logic for list modified
    }

    listRemovedFromBoardRule(listID, boardID) {

        //Logic for list remove
    }

    async cardAddedToListRule(cardID, listID, boardID) {
        try {
            // Assuming you have a method in your getter class to get the card details
            const cardDetails = await this.rqtInv.getCard(cardID);

            // Assuming the list ID for OPF Tech cards is '65a5339acc54164519f05621'
            const opfTechListID = '65a5339acc54164519f05621';

            // Check if the card is added to the OPF Tech list
            if (listID === opfTechListID) {

                // Get the maximum OPFTech number
                const maxOPFTechNumber = await this.findMaxOPFTechNumber();

                // Set label to maxOPFTechNumber + 1
                const nextOPFTechNumber = Number(maxOPFTechNumber) + 1;
                await this.rqtInv.addOPFTechNumber(cardID, nextOPFTechNumber);

                // Set Custom Fields
                await this.rqtInv.setCustomField(cardID, "65b3cb5da8d2096df151f434", "65b3eb34c91e150132d34f69");

                console.log('OPF Tech Card initialized successfully.');

            }

        } catch (error) {
            console.error('Error in cardAddedToListRule:', error);
            throw error;
        }
    }

    async cardModifiedInListRule(cardID, listID, boardID) {

        //Logic for card modified
        /* ENTRANCE IN OPF TECH LIST ON TO DO LIST BOARD 
        try {
            // Get the card details
            const cardDetails = await this.getter.getCard(cardID);

            // Check if the card has the desired label (e.g., #OPFTech-XXX)
            if (this.hasOPFTechLabel(cardDetails.labels)) {
                // Iterate through all boards in the workspace
                for (const board of this.workspace.getBoards()) {
                    // Skip the current board
                    if (board.getBoardID() === boardID) {
                        continue;
                    }

                    // Find cards in other boards with the same label
                    const matchingCards = await this.getter.findCardsByLabel(board.getBoardID(), cardDetails.labels);

                    // Update matching cards with the same label
                    for (const matchingCard of matchingCards) {
                        await this.updateMatchingCard(matchingCard, cardDetails);
                    }
                }
            }
        } catch (error) {
            console.error('Error in cardModifiedInListRule:', error);
            throw error;
        }*/


        /* CHECK FOR LISTS IF ON BOARD OPF TECH TASK BOARD */
    }

    async cardMovedToListRule(cardID, listID, boardID) {
        
        //Logic for card move
        /*try {
            // Assuming you have a method in your getter class to get the card details
            const cardDetails = await this.getter.getCard(cardID);

            // Assuming the list ID for OPF Tech cards is '65a5339acc54164519f05621'
            const opfTechListID = '65a5339acc54164519f05621';

            // Check if the card is moved to the OPF Tech list and does not have an OPFTech ID
            if (listID === opfTechListID && !this.hasOPFTechLabel(cardDetails.labels)) {
                // Apply the same logic as cardAddedToListRule
                await this.cardAddedToListRule(cardID, listID, boardID);
                console.log('OPF Tech Card initialized successfully after being moved to the OPF Tech list.');
            }
        } catch (error) {
            console.error('Error in cardMovedToListRule:', error);
            throw error;
        }*/
    }

    cardRemovedFromListRule(cardID, listID, boardID) {

        //Logic for card remove
    }


    /* HAS LABEL AND UPDATE */
    
    hasOPFTechLabel(labels) {
        // Check if the labels array contains the desired label (e.g., #OPFTech-XXX)
        return labels.some(label => label.name.startsWith('#OPFTech-'));
    }

    async findMaxOPFTechNumber() {
        try {
            let maxOPFTechNumber = 0;
    
            // Iterate through all boards in the workspace
            for (const board of this.workspace.getBoards()) {
                // Get all cards in the board
                const cards = await this.rqtInv.getBoardCards(board.getBoardID());
    
                // Iterate through each card to find the max OPFTech number
                for (const card of cards) {
                    const opfTechNumberString = await this.rqtInv.getOPFTechNumber(card.id);
                    
                    // Convert the fetched value to a number
                    const opfTechNumber = parseFloat(opfTechNumberString);
    
                    if (!isNaN(opfTechNumber) && opfTechNumber > maxOPFTechNumber) {
                        maxOPFTechNumber = opfTechNumber;
                    }
                }
            }
    
            // Return the maximum OPFTech number
            return maxOPFTechNumber;
        } catch (error) {
            console.error('Error in findMaxOPFTechNumber:', error);
            throw error;
        }
    }    

    async updateMatchingCard(matchingCard, sourceCardDetails) {
        try {
            // Assuming you want to update specific properties of the matching card
            // You can modify this logic based on your requirements
            await this.rqtInv.setCardDescription(matchingCard.id, sourceCardDetails.desc);
            await this.rqtInv.setCardPriority(matchingCard.id, sourceCardDetails.priority);
            // Add more update logic as needed
        } catch (error) {
            console.error('Error updating matching card:', error);
            throw error;
        }
    }



}

export default TrelloServerWorkspace;