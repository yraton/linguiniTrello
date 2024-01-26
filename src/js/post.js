// post.js
// Made by Yoann Raton, 25/01/2024

import axios from 'axios';
import oAuth from './authSettings.js';

class Post {
  constructor(oauth) {
    this.oauth = oauth;
  }

  async createCard(boardId, listId, cardName, cardDescription) {
    try {
      const response = await axios.post(
        `https://api.trello.com/1/cards?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}&idBoard=${boardId}&idList=${listId}&name=${encodeURIComponent(cardName)}&desc=${encodeURIComponent(cardDescription)}`
      );

      const createdCard = response.data;
      console.log('Card created successfully:', createdCard);
      return createdCard;
    } catch (error) {
      console.error('Error creating card:', error.response ? error.response.data : error.message);
      throw error;
    }
  }

  async copyCardToList(cardId, targetListId) {
    try {
      // Get details of the existing card
      const cardDetailsResponse = await axios.get(
        `https://api.trello.com/1/cards/${cardId}?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}`
      );

      const cardDetails = cardDetailsResponse.data;

      // Create a new card in the target list
      const response = await axios.post(
        `https://api.trello.com/1/cards?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}&idList=${targetListId}&name=${encodeURIComponent(cardDetails.name)}&desc=${encodeURIComponent(cardDetails.desc)}`
      );

      const copiedCard = response.data;
      console.log('Card copied successfully:', copiedCard);
      return copiedCard;
    } catch (error) {
      console.error('Error copying card:', error.response ? error.response.data : error.message);
      throw error;
    }
  }

  async setCardDescription(cardId, cardDescription) {
    try {
      await axios.put(
        `https://api.trello.com/1/cards/${cardId}?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}&desc=${encodeURIComponent(cardDescription)}`
      );

      console.log('Card description updated successfully.');
    } catch (error) {
      console.error('Error updating card description:', error.response ? error.response.data : error.message);
      throw error;
    }
  }

  async setCustomFieldDropdown(cardId, fieldName, options) {
    try {
        const url = `https://api.trello.com/1/cards/${cardId}/customFields`;
        const data = {
            name: fieldName,
            type: 'dropdown',
            options: options
        };
        const params = {
            key: this.oauth.apiKey,
            token: this.oauth.appAccessToken
        };
        const response = await axios.post(url, data, { params });
        console.log(`Custom field dropdown created successfully. Response:`, response.data);
    } catch (error) {
        console.error(`Error creating custom field dropdown:`, error.response ? error.response.data : error.message);
        throw error;
    }
  }

  async setCustomFieldText(cardId, fieldName) {
    try {
      const url = `https://api.trello.com/1/cards/${cardId}/customFields?name=${fieldName}&type=text&key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}`;
      const response = await axios.post(url);
      console.log(`Custom field text created successfully. Response:`, response.data);
    } catch (error) {
      console.error(`Error creating custom field text:`, error.response ? error.response.data : error.message);
      throw error;
    }
  }

  async addOPFTechNumber(cardId, opfTechNumber) {
    try {
      const frontText = `#OPFTech-${opfTechNumber}`;
      
      const cardDetailsResponse = await axios.get(
        `https://api.trello.com/1/cards/${cardId}?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}`
      );

      const cardDetails = cardDetailsResponse.data;

      const existingLabel = cardDetails.labels.find(label => label.name === frontText);

      if (!existingLabel) {
        const labelCreationResponse = await axios.post(
          `https://api.trello.com/1/cards/${cardId}/labels?key=${this.oauth.apiKey}&token=${this.oauth.appAccessToken}`,
          { name: frontText, color: "null", pos: "top", display_cardFront: "true" }
        );

        console.log(`Label ${frontText} added successfully. Response:`, labelCreationResponse.data);
      } else {
        console.log(`Label ${frontText} already exists on the card.`);
      }
    } catch (error) {
      console.error(`Error adding label ${frontText}:`, error.response ? error.response.data : error.message);
      throw error;
    }
  }
  
}

export default Post;
