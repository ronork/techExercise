const arr = [
    'apple',
    'ant',
    'aunt',
    'bat',
    'batch'
]


// Build AutoSuggest for the above input arr


class SearchAutoComplete {
    constructor() {
      this.lookUpTable = null;
      this.suggestions = [];
    }
    newNode() {
        return {
            isEnd: false,
            children: {}
        } 
     }
     
     add(word) {
         if(!this.lookUpTable) this.lookUpTable = this.newNode();
     
         let root = this.lookUpTable;
         for(const letter of word) {
             if(!(letter in root.children)) {
                 root.children[letter] = this.newNode();
             }
             root = root.children[letter];
         }
         root.isEnd = true;
     }
     find(word) {
        let root = this.lookUpTable;
        for(const letter of word) {
            if(letter in root.children) {
                root = root.children[letter];
            }
            else {
                return null; // if not found return null
            }
        }
      
        return root; // return the root where it ends search
      }

      traverse(root, word) {
        if(root.isEnd) {
          this.suggestions.push(word);
          return;
        }
    
        for(const letter in root.children) {
            this.traverse(root.children[letter], word + letter);
        }
    }
    
    findWords(word, CHILDREN=null) {
        const root = this.find(word);
    
        if(!root) return this.suggestions; // cannot suggest anything
    
        const children = root.children;
    
        let spread = 0;
    
        for(const letter in children) {
            this.traverse(children[letter], word + letter);
            spread++; 
    
            if(CHILDREN && spread === CHILDREN) break;
        }
    
        return this.suggestions;
    }
  }


  const srchInstance = new SearchAutoComplete();
  arr.map(ele=>{
    srchInstance.add(ele);
  })//add the words to the tree

// const res=srchInstance.findWords('a')

// console.log({res})





