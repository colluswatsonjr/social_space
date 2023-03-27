import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

import { Button } from '@mui/material';
import { ErrorContext } from "../context/ErrorContext";

const FollowButton = ({ accountId, onAdd, onRemove }) => {
  const { showError } = useContext(ErrorContext)
  const { user, login } = useContext(UserContext);

  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    user.followees.forEach((x) => {
      if (x.id === accountId) {
        return setIsFollowing(true)
      }
    })
  }, [user, accountId]);

  function handleFollow() {
    setIsFollowing(true)
    fetch(`/follow/${accountId}`, {
      method: 'POST',
      header: { "Content-Type": "application/json" },
    })
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => login(user))
          onAdd(user)
        } else {
          r.json().then((error) => showError(error))
        }
      })
  }
  function handleUnfollow() {
    setIsFollowing(false)
    fetch(`/unfollow/${accountId}`, {
      method: 'POST',
      header: { "Content-Type": "application/json" },
    })
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => login(user))
          onRemove(user)
        } else {
          r.json().then((error) => showError( error))
        }
      })
  }



  if (isFollowing) {
    return <Button onClick={handleUnfollow}>Unfollow</Button>;
  } else {
    return <Button onClick={handleFollow}>Follow</Button>;
  }
}

export default FollowButton;