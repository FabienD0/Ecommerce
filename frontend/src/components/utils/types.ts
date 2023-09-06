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

    export interface ItemCard {
        body_location: string
        category: string
        companyId: number
        id: number
        imageSrc: string
        name: string
        numInStock: number
        totalPrice: string | number
        quantity: number
    }


    export interface PropsSearchResult {
        searchInput: string,
        setSearchInput: (val: string) => void,
        isSearchResultActive: boolean,
        setIsSearchResultActive: (val: boolean) => void,
    }

    export interface PropsOverlay {
        setIsCart: (val:boolean) => void
    }

    export interface PropsHeader {
        setIsCart: (val:boolean) => void
    }

    export interface PropsCart {
        isCart: boolean
        setIsCart: (val:boolean) => void
    }
