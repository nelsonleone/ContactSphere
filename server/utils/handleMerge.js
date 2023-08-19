let mergedContact = {
   address: {
      country: 'United States',
      state: '',
      city: '',
      street: '',
      postalCode: ''
   },
   birthday:  '',
   companyName: '',
   department: '',
   email: '',
   firstName: '',
   jobTitle: '',
   lastName: '',
   labelledBy: [],
   middleName: '',
   nickname: '',
   phoneNumber: '',
   prefix: '',
   repPhoto: '',
   relatedPeople: [
      {
         name: '',
         label: ''
      }
   ],
   social: {
      site:'',
      handle: ''
   },
   suffix: '',
   website: '',
}


const handleMerge = (duplicates) => {
   for(const contact of duplicates){
      for(const [key, value] of Object.entries(contact)){

         console.log(value)
         if(key === 'address'){
            console.log(value.street)
            mergedContact.address.country = value.country || mergedContact.address.country;
            mergedContact.address.state = value.state || mergedContact.address.state;
            mergedContact.address.street = value.street || mergedContact.address.street;
            mergedContact.address.city = value.city || mergedContact.address.city;
            mergedContact.address.postalCode = value.postalCode || mergedContact.address.postalCode;
         }

         if(key === "relatedPeople"){
            mergedContact.relatedPeople = [...mergedContact.relatedPeople,...contact.relatedPeople]
            mergedContact.relatedPeople = mergedContact.relatedPeople.filter(val => val.name)
            mergedContact.relatedPeople = removeDuplicatesByProperties(mergedContact.relatedPeople)
         }


         if (key === "social") {
            if (value.site && value.handle) {
               mergedContact.social.site = value.site;
               mergedContact.social.handle = value.handle;
            }
         }

         if(key === "labelledBy"){
            mergedContact.labelledBy = [...mergedContact.labelledBy,...contact.labelledBy]
            mergedContact.labelledBy = mergedContact.labelledBy.filter(val => val.label)
            mergedContact.labelledBy = removeDuplicateLabelledByObj(mergedContact.labelledBy)
         }

         
         if(value && key !== "labelledBy" && key !== "social" && key !== "relatedPeople" && key !== "address"){
            mergedContact[key] = value
         }
      }
   }
   return mergedContact;
}


const removeDuplicatesByProperties = (arr) => {
   const seen = new Set()
   const uniqueArr = []

   for (const item of arr) {
      const key = `${item.name}-${item.label}`;

      if (!seen.has(key)) {
         seen.add(key)
         uniqueArr.push(item)
      }
   }

   return uniqueArr;
}


const removeDuplicateLabelledByObj = (labelledBy) => {
   const seen = new Set()
   const uniqueArr = []

   for (const item of labelledBy) {
      const key = `${item.label}`;

      if (!seen.has(key)) {
         seen.add(key)
         uniqueArr.push(item)
      }
   }

   return uniqueArr;
}

module.exports = handleMerge;