/* A public curated catalogue. No account, tokens, requests or server jobs. */
(function(){
 const catalogue=[
 {id:'3VCXx37jNGNOMns6z2OnvJ',title:'Swing Lynn',artist:'Harmless',explicit:false},
 {id:'754kgU5rWscRTfvlsuEwFp',title:'Kiss Me',artist:'Sixpence None The Richer',explicit:false},
 {id:'1LzNfuep1bnAUR9skqdHCK',title:'Fade Into You',artist:'Mazzy Star',explicit:false},
 {id:'2enPRFda84VE2wtI8c86Uf',title:'Always Forever',artist:'Cults',explicit:false},
 {id:'61OJxhoY3Ix50rYVKo8zRK',title:'Can I Call You Tonight?',artist:'Dayglow',explicit:false},
 {id:'3fjmSxt0PskST13CSdBUFx',title:'Somewhere I Belong',artist:'Linkin Park',explicit:false},
 {id:'3PH4GOv16ywKCgTbSGaZzh',title:'Shape of My Heart',artist:'Backstreet Boys',explicit:false},
 {id:'0SsYlkXxZ5vkWOTsKxMfMz',title:'Lonesome Town',artist:'Ricky Nelson',explicit:false}
 ].filter(t=>t.explicit===false&&/^[A-Za-z0-9]{22}$/.test(t.id));
 function dayKey(now=Date.now()){return Math.floor((Number(now)+19800000)/86400000);}
 function dailyTracks(now=Date.now()){const start=((dayKey(now)*3)%catalogue.length+catalogue.length)%catalogue.length;return Array.from({length:Math.min(5,catalogue.length)},(_,i)=>({...catalogue[(start+i)%catalogue.length]}));}
 window.PortfolioMusicCatalogue={dayKey,dailyTracks};
})();
