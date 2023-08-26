    export interface Item {
        body_location: string
        category: string
        companyId: number
        id: number
        imageSrc: string
        name: string
        numInStock: number
        price: string
    }

    export interface PropsSearchResult {
        searchInput: string,
        setSearchInput: (val: string) => void,
        isSearchResultActive: boolean,
        setIsSearchResultActive: (val: boolean) => void,
    }
