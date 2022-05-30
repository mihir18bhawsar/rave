import React, { useEffect, useState } from "react";
import { Card, CardContent, Button } from "@material-ui/core";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import apiService from "../Api/apiService";
import appconfig from "../appconfig";
import Loading from "../Components/Loading";
const ManagerRequests = () => {
  const [approved, setApproved] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const asyncCall = async () => {
      const res = await apiService.get("/user/admin/nonApprovedMgr");
      setData(res.data.data);
      console.log(res.data.data[0]);
      setLoading(false);
    };
    asyncCall();
  }, []);
  const handleApprove = async (id) => {
    setLoading(true);
    await apiService.patch("/user/admin/nonApprovedMgr/" + id);
    setLoading(false);
  };
  return loading ? (
    <Loading />
  ) : (
    <div className="w-content p-8 mt-8 mx-24 flex-col gap-24 bg-slate-800 rounded-3xl opacity-90 flex items-center">
      <div
        className="text-xl font-light text-center uppercase w-full text-yellow-400"
        style={{ letterSpacing: "0.4em" }}
      >
        Unapproved managers
      </div>
      {data.length === 0 && (
        <div className="text-4xl text-center text-white font-black opacity-50">
          {" "}
          There are no Unapproved managers{" "}
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-5 pb-8 gap-8 items-center justify-center">
        {data.length > 0 &&
          data.map((manager) => {
            return (
              <Card
                key={manager.id}
                className="w-56 bg-slate-300 flex gap-2 flex-col items-center p-1 rounded-2xl"
                style={{
                  color: appconfig.color.primary,
                  borderRadius: "2em",
                }}
              >
                <img
                  className="w-full rounded-full border-4 border-slate-800"
                  style={{ height: "85%" }}
                  src={appconfig.url + "/img/" + manager.avatar}
                  alt="imgae"
                />
                <CardContent
                  style={{
                    borderRadius: "2em",
                    height: "15%",
                    margin: "0",
                    padding: "0.5em  2em",
                  }}
                  className="w-full bg-slate-800 gap-2  flex flex-col items-center uppercase tracking-widest "
                >
                  <div className="text-sm font-bold tracking-widest text-yellow-400">
                    {manager.name}
                  </div>

                  <Button
                    variant="contained"
                    style={{
                      background: appconfig.color.primary,
                      color: "white",
                      borderRadius: "2em",
                    }}
                    className={`${
                      approved.includes(manager._id) &&
                      "pointer-events-none opacity-50"
                    } w-full flex h-10 `}
                    onClick={() => {
                      handleApprove(manager._id);
                      setApproved([...approved, manager._id]);
                    }}
                  >
                    {approved.includes(manager._id) ? "Approved" : "Approve"}
                    {approved.includes(manager._id) ? (
                      <CheckBoxIcon />
                    ) : (
                      <CheckBoxOutlineBlankIcon />
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default ManagerRequests;
