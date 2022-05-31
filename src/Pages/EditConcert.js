import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import apiservice from "../Api/apiService";
import Loading from "../Components/Loading";
import { toastMessage } from "../Actions";

const EditConcert = () => {
  const { id } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const me = useSelector((state) => state.me);
  useEffect(() => {
    setLoading(true);
    const asyncCall = async () => {
      try {
        const res = await apiservice.get("/concert/" + id);
        setLoading(false);
        if (!(res.data.data.postedBy == me)) {
          history.push("/concerts");
          await dispatch(toastMessage(0, "Not permitted"));
        }
      } catch (err) {
        await dispatch(toastMessage(0, "some error occured"));
        history.push("/concerts");
      }
    };
    asyncCall();
  }, []);
  return loading ? <Loading /> : <div>edit</div>;
};

export default EditConcert;
