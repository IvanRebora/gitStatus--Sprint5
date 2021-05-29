const fs = require('fs');

// Funcionalidades usuarios
const User = {

    fileName: './data/users.json',

    // Traer a todos los usuarios del JSON a un ARRAY de OL
    getData: function() {
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
    },

    // Tambien traigo todos los usuarios como metodo resumido. Es el que voy a utilizar
    findAll: function() {
        return this.getData();
    },

    // Generar automaticamente un ID
    generateId: function() {
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        if (lastUser) {
            return lastUser.id + 1;                
        }
        return 1;
    },
    
    // Buscar a un usuario por ID
    findByPk: function(id) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser.id === id);
        return userFound;
    },

    // Buscar a un usuario por cualquier campo
    findByField: function(field, text) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser[field] === text);
        return userFound;
    },

    // Crear un usuario
    create: function(userData) {
        let allUsers = this.findAll(); 

        let newUser = {
            id: this.generateId(),
            ...userData
        }

        allUsers.push(newUser);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '));
        return newUser;
    },

    // Eliminar un usuario
    delete: function(id) {
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ' '));
        return true;
    },
    // Actualiza un usuario
    update: function(id,newData) {
         let allUsers    = this.findAll();
         let finalUsers  = allUsers.filter(oneUser => oneUser.id !== id);
         finalUsers.push(newData);
         console.log('newData');
         console.log(newData);
         console.log('finalUsers');
         console.log(finalUsers);
         fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ' '));
         return true;
    }

};

module.exports = User;