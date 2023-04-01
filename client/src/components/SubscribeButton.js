import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

import { Button } from '@mui/material';
import { ErrorContext } from "../context/ErrorContext";

const SubscribeButton = ({ spaceId, space, onSub, onUnsub }) => {
    const { showError } = useContext(ErrorContext)
    const { my } = useContext(UserContext);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [subId, setSubId] = useState(null)

    useEffect(() => {
        space.subscribes.forEach((x) => {
            if (x.user_id === my.id) {
                setSubId(x.id)
                return setIsSubscribed(true)
            }
        })
    }, [my, spaceId]);

    function handleSubscribe() {
        setIsSubscribed(true)
        fetch(`/subscribe/${spaceId}`, {
            method: 'POST',
            header: { "Content-Type": "application/json" },
        })
            .then((r) => {
                if (r.ok) {
                    r.json().then(r => {
                        setSubId(r.id)
                        onSub(r)
                    })
                } else {
                    r.json().then((error) => showError(error))
                }
            })
    }

    function handleUnsubscribe() {
        setIsSubscribed(false)
        fetch(`/unsubscribe/${subId}`, {
            method: "DELETE",
        }).then((r) => {
            if (r.ok) {
                r.json().then((r) => {
                    setSubId(null)
                    onUnsub(r)
                })
            }
        });
    }

    if (isSubscribed) {
        return <Button onClick={handleUnsubscribe}>Unsubscribe</Button>;
    } else {
        return <Button onClick={handleSubscribe}>Subscribe</Button>;
    }
}

export default SubscribeButton;