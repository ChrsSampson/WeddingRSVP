
import { useState } from "react"

export default function UserSearchBar ({handleSearch}) {

    const [searchTerm, setSearchTerm] = useState('')

    function updateField(e) {
        setSearchTerm(e.target.value)
        handleSearch(searchTerm)
    }

    return (
        <div className="search-bar">
            <input className="search-input" placeholder="Filter Users" value={searchTerm} onChange={(e) => updateField(e)}></input>
        </div>
    )
}