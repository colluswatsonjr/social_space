import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";


const FollowButton = ({ accountId, onAdd, onRemove }) => {
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
          r.json().then((error) => console.log('not logged in', error))
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
          r.json().then((error) => console.log('not logged in', error))
        }
      })
  }



  if (isFollowing) {
    return <button onClick={handleUnfollow}>Unfollow</button>;
  } else {
    return <button onClick={handleFollow}>Follow</button>;
  }
}

export default FollowButton;