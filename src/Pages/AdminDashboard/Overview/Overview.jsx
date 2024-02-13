import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { BaseURL } from "../../../Utils/Utils";
import useFetch from "../../../Hooks/useFetch";
import { FolderCopy, HowToReg, OndemandVideo } from "@mui/icons-material";
import { useShowLoading } from "../../../Contexts/ShowLoadingContext";
import SkeletonLoading from "../../../Components/SkeletonLoading/SkeletonLoading";
import { DataGrid , faIR} from "@mui/x-data-grid";
import { Alert } from "@mui/material";

function Overview() {
  const { datas: infos } = useFetch("infos/p-admin", true);

  const { isShowLoading, setIsShowLoading } = useShowLoading()
  const [infoDetails, setInfoDetails] = useState([]);
  const [lastUsers, setLastUsers] = useState([]);
  console.log(lastUsers)
  const columns = [
    {
      field: "id",
      headerName: "ردیف",
      width: 10,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: " نام ",
      width: 180,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "username",
      headerName: " نام کاربری ",
      width: 180,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "phone",
      headerName: " تلفن تماس",
      width: 120,
      headerAlign: "center",
      align: "center"
    },
    {
      field: "email",
      headerName: " ایمیل",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "userRole",
      headerName: " نقش",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (user) => {
        return (
          <span
            className={`${
              user.row.role === "ADMIN"
                ? "bg-emerald-100 text-primary p-2 rounded-lg"
                : "bg-gray-200 text-mainSlate px-3 py-2 rounded-lg"
            }`}
          >
            {user.row.role === "ADMIN" ? "مدیر" : "کاربر"}
          </span>
        );
      },
    },
   
  ];
  useEffect(() => {
    axios
      .get(`${BaseURL}infos/p-admin`, {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setInfoDetails(response.data.infos);
        setLastUsers(response.data.lastUsers);
      })
      .catch((error) => {
        console.log(error);
        toast.error("  خطا در اتصال به سرور ");
      });
  }, []);

  return (
    <>
      <div className="flex-center flex-wrap gap-x-3 gap-y-4 md:gap-x-10 mb-40">
        {infoDetails.map(({ title, count }) => {
          console.log(title);

          if (title === "ثبت نامی‌ها") {
            return (
              <InfosBox
                color={"bg-amber-600 dark:bg-yellow-400"}
                title={title}
                count={count}
                icon={<HowToReg className="text-white size-12" />}
              />
            );
          } else if (title === "دوره‌ها") {
            return (
              <InfosBox
                color={"bg-sky-500 dark:bg-secondary"}
                title={title}
                count={count}
                icon={<FolderCopy className="text-white size-12" />}
              />
            );
          } else {
            return (
              <InfosBox
                color={"bg-primary"}
                title={title}
                count={count}
                icon={<OndemandVideo className="text-white size-12" />}
              />
            );
          }
        })}
      </div>
      {isShowLoading ? (
        <SkeletonLoading listsToRender={5} />
      ) : (
        <>
          <div className="w-full dark:text-white">
            <h2 className="font-DanaBold my-8 text-2xl"> کاربرهای جدید</h2>
            <div className='lg:max-w-[40rem] xl:max-w-full'>
            {lastUsers.length > 0 ? (
              <DataGrid
                rows={lastUsers.map((lastUser, index) => {
                  return { id: index + 1, ...lastUser };
                })}
                className="dark:text-white"
                rowHeight={150}
                getRowId={(lastUser) => lastUser._id}
                columns={columns}
                hideFooter
                localeText={faIR.components.MuiDataGrid.defaultProps.localeText}
              />
            ) : (
              <Alert severity="info">تاکنون کاربری ثبت نگردیده است</Alert>
            )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Overview;

const InfosBox = ({ title, count, icon, color }) => {
  return (
    <div
      className={`${color} flex items-center gap-x-2.5 md:gap-x-4 flex-grow md:flex-grow-0 md:w-64 p-2 rounded-2xl`}
    >
      <div className="flex-center w-14 h-14 md:w-[68px] md:h-[68px] bg-white/20 rounded-2xl">
        {icon}
      </div>
      <div className="flex flex-col gap-y-1.5 md:gap-y-2 text-white">
        <span className="font-MorabbaBold text-xl">{title} </span>
        <span className="font-DanaBold text-xl">{count}</span>
      </div>
    </div>
  );
};

export { InfosBox };
