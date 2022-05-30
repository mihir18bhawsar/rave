import React, { useEffect, useState } from "react";
import { Card, CardContent, Button } from "@material-ui/core";
import apiService from "../Api/apiService";
import appconfig from "../appconfig";
const ManagerRequests = () => {
  const [approved, setApproved] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    const asyncCall = async () => {
      const res = await apiService.get("/user/admin/nonApprovedMgr");
      setData(res.data.data.filter((manager) => !manager.isApproved));
    };
    asyncCall();
  }, [approved]);
  return (
    <div className="w-content p-8 mt-8 mx-24 flex-col gap-24 bg-slate-800 rounded-3xl opacity-90 flex items-center">
      <div
        className="text-xl font-light text-center uppercase w-full text-yellow-400"
        style={{ letterSpacing: "0.4em" }}
      >
        Unapproved managers
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 pb-8 gap-8 items-center justify-center">
        {data.length > 0 &&
          data.map((manager) => {
            return (
              <Card
                className="w-56 h-68 bg-white rounded-xl flex flex-col items-center p-2"
                style={{ color: appconfig.color.primary }}
              >
                <img
                  className="w-full h-3/4"
                  src={appconfig.url + "/img/" + manager.avatar}
                  alt="imgae"
                >
                  {console.log(appconfig.url + "/img/" + manager.avatar)}
                </img>
                <CardContent className="w-full gap-2 flex flex-col items-center uppercase tracking-widest h-1/4">
                  <div>{manager.name}</div>

                  <Button
                    variant="contained"
                    color="success"
                    className={`${
                      approved.includes(manager.id) &&
                      "pointer-events-none opacity-20"
                    } bg-green-400 w-full h-10`}
                    onClick={() => {
                      setApproved([...approved, manager.id]);
                    }}
                  >
                    Approve
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
