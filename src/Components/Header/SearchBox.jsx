import React, { useState } from "react";
import { Search } from "@mui/icons-material";
import { Box, Modal, Backdrop } from "@mui/material";
import Button from "../../common/Form/Button";
import { useNavigate } from "react-router-dom";

function SearchBox() {
  const [openSearchBox, setOpenSearchBox] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const Navigate = useNavigate();
  const SearchHandler = () => {
    Navigate(`/search/${searchValue}`);
  };
  return (
    <>
      {/* Search Box in XL */}
      <div className="relative group hidden lg:block">
        <form className="hidden xl:block">
          <label className="relative h-14 block transition-all">
            <input
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              type="text"
              className="rounded-full dark:focus:text-white outline-none text-slate-500 dark:text-gray-600 placeholder:text-slate-500 dark:placeholder-gray-600 w-48 focus:w-64 h-full border border-transparent hover:border-gray-200 dark:border-gray-700 focus:text-zinc-700 dark:focus:border-gray-600 bg-gray-100 dark:bg-gray-main text-base placeholder:text-lg pl-14 pr-5 block transition-all"
              placeholder="جستجو"
            />
            <Button
              btnType="submit"
              className="absolute left-5 top-0 bottom-0 w-7 h-7 my-auto text-slate-500 dark:text-gray-600"
              disabled={false}
              onClick={SearchHandler}
            >
              {" "}
              <Search className="text-slate-500 dark:text-gray-500" />{" "}
            </Button>
          </label>
        </form>
      </div>
      {/* Search Box in LG */}
      <div className="hidden lg:block xl:hidden">
        <div
          onClick={() => setOpenSearchBox((perv) => !perv)}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-gray-100 dark:bg-transparent dark:border dark:border-gray-700 dark:hover:border-gray-600 transition-colors cursor-pointer"
        >
          <Search className="text-slate-500 dark:text-gray-500" />
        </div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openSearchBox}
          onClose={() => setOpenSearchBox((prev) => !prev)}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          sx={{
            backdropFilter: "blur(6px)",
            backgroundColor: "rgb(130 130 130 / 8%)",
          }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Box className="absolute left-44 top-28 z-10 outline-none">
            <label className="relative block w-64">
              <input
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                type="text"
                className="w-full h-16 pr-7 pl-16 text-lg outline-none bg-white dark:bg-gray-700 placeholder:text-slate-500 dark:placeholder:text-gray-600 text-zinc-700 dark:text-gray-500 rounded-2xl"
                placeholder="جستجو در بین دوره ها"
              />
              <Button
                btnType="submit"
                className="absolute left-5 top-0 bottom-0 w-7 h-7 my-auto text-slate-500 dark:text-gray-600"
                disabled={false}
                onClick={SearchHandler}
              >
                {" "}
                <Search className="text-slate-500 dark:text-gray-500" />{" "}
              </Button>
            </label>
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default SearchBox;
