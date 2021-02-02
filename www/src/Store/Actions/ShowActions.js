
export const setSearchValue=(value=null)=>{
    const showStore=store.show;
    if(showStore.searchvalue!==value){
        showStore.searchvalue=value;
    }
}