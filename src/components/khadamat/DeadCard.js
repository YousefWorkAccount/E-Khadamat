import { Card, CardContent, CardHeader, Link, Tooltip, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import CardData from "./CardData";
import DeadDropdown from "./DeadDropdown";

const DeadCard = ({ person }) => {
    const { page } = useSelector((state) => state.dead);
    const {
        NameFl,
        NationalityName,
        CemeteryLocationLat: lat,
        CemeteryLocationLong: lng,
        AgeYears,
        AgeMonths,
        AgeDays,
        CemeteryName,
        CemeteryAddress,
        DateOfDeath,
        DeathTime,
        NationalNumber,
    } = person;

    return (
        <Card
            elevation={10}
            sx={{
                height: { xs: 655, md: 580, lg: 605, xl: 550 },
                overflowY: "auto",
                background: `
                    linear-gradient(
                        45deg,
                        hsl(180deg 6% 93%) 0%,
                        hsl(181deg 11% 93%) 11%,
                        hsl(182deg 18% 93%) 22%,
                        hsl(183deg 25% 94%) 33%,
                        hsl(184deg 33% 94%) 44%,
                        hsl(185deg 42% 94%) 56%,
                        hsl(186deg 52% 94%) 67%,
                        hsl(187deg 63% 95%) 78%,
                        hsl(187deg 76% 95%) 89%,
                        hsl(188deg 92% 95%) 100%
                      )`,
            }}
        >
            <CardHeader
                titleTypographyProps={{
                    variant: "h4",
                    align: "center",
                    // gutterBottom: true,
                }}
                title={
                    <Link
                        component={RouterLink}
                        to={`/dead/${person.Id}?page=${page}`}
                        underline="hover"
                    >
                        {NameFl}
                    </Link>
                }
                action={<DeadDropdown lat={lat} long={lng} id={person.Id} page={page} />}
            />
            <CardContent sx={{ mt: 2 }}>
                <CardData
                    label="??????????:"
                    data={
                        <Tooltip title={`${AgeYears} ?????? / ${AgeMonths} ???????? / ${AgeDays} ????????`}>
                            <Typography>{AgeYears} ??????</Typography>
                        </Tooltip>
                    }
                />
                <CardData label="??????????????:" data={NationalityName} />
                <CardData label="??????????????:" data={CemeteryName} />
                <CardData label="?????????? ??????????????:" data={CemeteryAddress} />
                <CardData label="?????????? ????????????:" data={DateOfDeath.split("T")[0]} />
                <CardData label="?????? ????????????:" data={DeathTime} />
                <CardData label="?????? ????????????:" data={NationalNumber} noDivider />
            </CardContent>
        </Card>
    );
};

export default DeadCard;
