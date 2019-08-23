var Express = require('express');

var router = Express.Router({caseSensitive: true});

//data storage
var elasticsearch = require('elasticsearch');
var Client = new elasticsearch.Client({
   host: 'localhost:9200'
});

router.baseURL = '/Contact';

//the contact list starts off empty
/*
   data should be stored as
   contacts: {
      name1 : {
         name: string,
         phone: 7 digit number,
         address: string,
         email: string
      },
      name2: {
         ...
      },
      ...
   }

   all fields except name can be empty.
*/
var contacts = {
   Alice:{
      name:'Alice',
      phone:'1234567'
   },
   Jane:{
      name:'Jane',
      phone:'1234567'
   },
   Larry:{
      name:'Larry',
      phone:'1234567'
   },
   Zeke:{
      name:'Zeke',
      phone:'1234567'
   }
};

//get list of contacts
router.get('/', function(req, res) {
   var contactList = [];
   var returnValue = [];
   var idx = 0;

   var query = req.query.query || "";
   //default page size is 10
   var pageSize = req.query.pageSize || 10;
   //default page is zero
   var page = req.query.page || 0;

   Client.search({
    index: 'contacts',
    body: {
      query: {
        wildcard: {
          name: query + '*'
       }
      }
    }
   }, (err, rsp, status) => {
      if (err) {
         console.log(err);
         return res.status(404).send('Name not found');
      }
      else {
         var contactList = rsp.hits.hits;

         contactList.forEach((contact) => {
            returnValue[idx++] = contact._source;
         })

         returnValue = returnValue.splice(page * pageSize, (page * pageSize) + pageSize);

         return res.status(200).send(returnValue);
      }
   })
});

//allows posts with any fields
//checks the phone format
router.post('/:name', function(req, res) {
   var newContact = req.body;

   newContact.name = req.params.name;

   if (req.body.phone)
      if (!(req.body.phone.length && req.body.phone.length === 7))
         return res.status(400).send('Phone format is incorect.');

   //contacts[req.params.name] = newContact;
   Client.index({
      index: 'contacts',
      id: req.params.name.toLowerCase(),
      refresh: true,
      body: newContact

   }, (err, rsp, status) => {
      if (err) {
         console.log(err);
         return res.status(400).send("An unexpected error has occured");
      }
      else {
         return res.status(200).send("Success");
      }
   })

});

//gets a specific name
router.get('/:name', function(req, res) {
   var contact;

   Client.get({
      index: 'contacts',
      id: req.params.name.toLowerCase()
   }, (err, rsp, status) => {
      if (err) {
         return res.status(404).send('Name not found');
      }
      else{
         contact = rsp._source;

         if (!contact){
            return res.status(400).send('An unexpected problem has occured');
         }

         return res.status(200).send(contact);
      }
   });
});

//replace body with new body provided
router.put('/:name', function(req, res) {
   var newContact = req.body;

   newContact.name = req.params.name;

   if (req.body.phone)
      if (!(req.body.phone.length && req.body.phone.length === 7))
         return res.status(400).send('Phone format is incorect.');

   Client.get({
      index: 'contacts',
      id: req.params.name.toLowerCase()
   }, (err, rsp, status) => {
      if (err) {
         return res.status(404).send('Name not found');
      }
      else{
         Client.index({
            index: 'contacts',
            id: req.params.name.toLowerCase(),
            body: newContact

         }, (err, rsp, status) => {
            if (err) {
               console.log(err);
               return res.status(400).send("An unexpected error has occured");
            }
            else {
               return res.status(200).send("Success");
            }
         })
      }
   });

});

//deletes an element from the json object
router.delete('/:name', function(req, res) {

   Client.get({
      index: 'contacts',
      id: req.params.name.toLowerCase()
   }, (err, rsp, status) => {
      if (err) {
         return res.status(404).send('Name not found');
      }
      else{
         Client.deleteByQuery({
          index: 'contacts',
          body: {
            query: {
              match: {
                name: req.params.name
             }
            }
          }
         }, (err, rsp, status) => {
            if (err) {
               console.log(err);
               return res.status(404).send('Name not found');
            }
            else {

               return res.status(200).send("Success");
            }
         });
      }
   });


});

module.exports = router;
