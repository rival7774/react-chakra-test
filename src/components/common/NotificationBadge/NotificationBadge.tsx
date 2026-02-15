import {Badge} from "@chakra-ui/react";

type NotificationBadgeProps = {
    count: number
    style?: React.CSSProperties;
}

export const NotificationBadge = ({count, style}: NotificationBadgeProps) => (
    <Badge
        position="absolute"
        bottom="-4px"
        right="-9px"
        width="20px"
        height="20px"
        bg="red.500"
        color="white"
        borderRadius="full"
        fontSize="0.7rem"
        display="flex"
        alignItems="center"
        justifyContent="center"
        style={style}
    >
        {count}
    </Badge>
);
