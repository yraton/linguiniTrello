// updater.js
// Made by Yoann Raton, 24/01/2024

import Workspace from './workspace.js';
import Board from './board.js';
import List from './list.js';
import Card from './card.js';
import Ruler from './ruler.js';
import Post from './post.js';
import Get from './get.js';

class Updater {
    constructor(workspace, ruler, getter, poster) {
        this.workspace = workspace;
        this.ruler = ruler;
        this.getter = getter;
        this.poster = poster;
    }

    async checkForModifications() {
        // Iterate through each board in the workspace
        for (const board of this.workspace.getBoards()) {
            // Get the existing data for the board from opfwsp
            const existingBoardData = await this.getter.getBoard(board.getBoardID());

            // Compare ID and name of boards
            if (this.boardDataChanged(existingBoardData, board)) {
                // Logic to perform when board data needs to be updated
                console.log(`Board with ID ${board.getBoardID()} needs to be updated.`);
            }

            // Compare lists for each board
            for (const list of board.getLists()) {
                const existingListData = await this.getter.getList(list.getListID());
                if (this.listDataChanged(existingListData, list)) {
                    // Logic to perform when list data needs to be updated
                    console.log(`List with ID ${list.getListID()} in Board ${board.getBoardID()} needs to be updated.`);
                }

                // Compare cards for each list
                for (const card of list.getCards()) {
                    const existingCardData = await this.getter.getCard(card.getCardID());
                    if (this.cardDataChanged(existingCardData, card)) {
                        // Logic to perform when card data needs to be updated
                        console.log(`Card with ID ${card.getCardID()} in List ${list.getListID()} needs to be updated.`);
                    }
                }
            }
        }
    }

    // Method to compare the ID and name of the latest Trello board with existing data in opfwsp
    boardDataChanged(existingBoard, latestBoardData) {
        const idChanged = existingBoard.id !== latestBoardData.id;
        const nameChanged = existingBoard.name !== latestBoardData.name;

        if (idChanged || nameChanged) {
            console.log(`Board ID or name changed: ID - ${existingBoard.id} to ${latestBoardData.id}, Name - ${existingBoard.name} to ${latestBoardData.name}`);
        }

        return idChanged || nameChanged;
    }

    // Method to compare the ID and name of the latest Trello list with existing data in opfwsp
    listDataChanged(existingList, latestListData) {
        const idChanged = existingList.id !== latestListData.id;
        const nameChanged = existingList.name !== latestListData.name;

        if (idChanged || nameChanged) {
            console.log(`List ID or name changed: ID - ${existingList.id} to ${latestListData.id}, Name - ${existingList.name} to ${latestListData.name}`);
        }

        return idChanged || nameChanged;
    }

    // Method to compare the ID and name of the latest Trello card with existing data in opfwsp
    cardDataChanged(existingCard, latestCardData) {
        const idChanged = existingCard.id !== latestCardData.id;
        const nameChanged = existingCard.name !== latestCardData.name;

        if (idChanged || nameChanged) {
            console.log(`Card ID or name changed: ID - ${existingCard.id} to ${latestCardData.id}, Name - ${existingCard.name} to ${latestCardData.name}`);
        }

        return idChanged || nameChanged;
    }
}

export default Updater;
