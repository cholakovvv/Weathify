import { useState, useEffect } from 'react';
import { UilSearch } from '@iconscout/react-unicons';
import { UilAngleDown } from '@iconscout/react-unicons';

const Search = () => {
    const [countries, setCountries] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const [selected, setSelected] = useState("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetch("https://restcountries.com/v2/all?fields=name")
            .then((res) => res.json())
            .then((data) => {
                setCountries(data);
            });
    }, []);
    return (
        <div className="flex flex-row justify-center my-6">
            <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
                <div className="w-72 font-medium h-9 mt-1 absolute">
                    <div
                        onClick={() => setOpen(!open)}
                        className={`bg-white w-full p-2 flex items-center justify-between rounded ${!selected && "text-gray-700"
                            }`}
                    >
                        {selected
                            ? selected?.length > 25
                                ? selected?.substring(0, 25) + "..."
                                : selected
                            : "Select City"}
                        <UilAngleDown size={20} className={`${open && "rotate-180"}`} />
                    </div>
                    <ul
                        className={`bg-white mt-2 overflow-y-auto ${open ? "max-h-60" : "max-h-0"
                            } `}
                    >
                        <div className="flex items-center px-2 sticky top-0 bg-white">
                            <UilSearch size={18} className="text-gray-700" />
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value.toLowerCase())}
                                placeholder="Enter City..."
                                className="placeholder:text-gray-700 p-2 outline-none"
                            />
                        </div>
                        {countries?.map((country) => (
                            <li
                                key={country?.name}
                                className={`p-2 text-sm hover:bg-sky-900 hover:text-white
              ${country?.name?.toLowerCase() === selected?.toLowerCase() &&
                                    "bg-sky-600 text-white"
                                    }
              ${country?.name?.toLowerCase().startsWith(inputValue)
                                        ? "block"
                                        : "hidden"
                                    }`}
                                onClick={() => {
                                    if (country?.name?.toLowerCase() !== selected.toLowerCase()) {
                                        setSelected(country?.name);
                                        setOpen(false);
                                        setInputValue("");
                                    }
                                }}
                            >
                                {country?.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Search
