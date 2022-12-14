import { KeyboardDoubleArrowLeftRounded } from "@mui/icons-material";
import {
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Chip,
    CircularProgress,
    Container,
    Fab,
    Grid,
    Tooltip,
    Typography,
} from "@mui/material";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import Center from "components/khadamat/Center";
import DeadDetailsData from "components/khadamat/DeadDetailsData";
import ViewDate from "components/khadamat/ViewDate";
import deadService from "config/axios/deadServices";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { setDeadPageNo } from "redux/slices/deadSlice";

const cardStyles = {
    width: "100%",
    my: 10,
    borderRadius: 10,
    background: `linear-gradient(
                    30deg,
                    hsl(160deg 19% 94%) 0%,
                    hsl(161deg 23% 94%) 13%,
                    hsl(163deg 26% 94%) 19%,
                    hsl(164deg 30% 94%) 23%,
                    hsl(166deg 34% 94%) 27%,
                    hsl(167deg 38% 94%) 31%,
                    hsl(168deg 42% 93%) 34%,
                    hsl(169deg 46% 93%) 38%,
                    hsl(171deg 49% 93%) 41%,
                    hsl(172deg 53% 93%) 44%,
                    hsl(173deg 56% 93%) 47%,
                    hsl(174deg 60% 93%) 50%,
                    hsl(175deg 58% 93%) 53%,
                    hsl(175deg 55% 94%) 56%,
                    hsl(176deg 52% 94%) 59%,
                    hsl(176deg 49% 94%) 62%,
                    hsl(177deg 45% 95%) 66%,
                    hsl(177deg 41% 95%) 69%,
                    hsl(178deg 37% 95%) 73%,
                    hsl(178deg 32% 96%) 77%,
                    hsl(179deg 26% 96%) 81%,
                    hsl(179deg 19% 96%) 87%,
                    hsl(180deg 11% 96%) 100%
                )`,
};

const DeadDetails = () => {
    const { id } = useParams();
    const page = useLocation().search.split("page=")[1];
    const [person, setPerson] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        language: "ar",
    });

    useEffect(() => {
        if (person && person.Id !== id) {
            (async () => {
                try {
                    dispatch(setDeadPageNo(1));
                    const { data } = await deadService.searchDead({ id });
                    setPerson(data.PagedList[0]);
                    setLoading(false);
                } catch (err) {
                    console.log({ err });
                    toast.error("?????? ?????? ?????? ????");
                    setLoading(false);
                }
            })();
        }
    }, [id]);

    return loading ? (
        <Center my={20}>
            <CircularProgress size={100} colo="info" />
        </Center>
    ) : (
        <Container>
            <Tooltip title="???????????? ?????? ??????????">
                <Fab
                    onClick={() => {
                        dispatch(setDeadPageNo(Number(page)));
                        navigate("/dead/management");
                    }}
                    color="info"
                    variant="extended"
                    sx={{ top: 16, fontSize: 20 }}
                >
                    ????????????
                    <KeyboardDoubleArrowLeftRounded />
                </Fab>
            </Tooltip>
            <Card elevation={10} sx={cardStyles}>
                <CardHeader
                    titleTypographyProps={{
                        variant: "h1",
                        align: "center",
                        gutterBottom: true,
                    }}
                    title={`???????????? ${person.NameFl}`}
                />
                <CardContent sx={{ mb: 0, pb: 0 }}>
                    <Grid
                        container
                        my={5}
                        spacing={3}
                        alignItems="center"
                        justifyContent={"center"}
                    >
                        <Grid item xs={12} sm={12} md={6} lg={5}>
                            <DeadDetailsData
                                title="??????????:"
                                data={`${person.AgeYears} ?????? / ${person.AgeMonths} ???????? / ${person.AgeDays} ????????`}
                            />
                            <DeadDetailsData title="??????????????:" data={person.NationalityName} />
                            <DeadDetailsData title="??????????:" data={person.GenderTypeName} />
                            <DeadDetailsData
                                title="?????????? ????????????:"
                                data={<ViewDate date={person.DateOfDeath} />}
                            />
                            <DeadDetailsData title="?????? ????????????:" data={person.DeathTime} />
                            <DeadDetailsData title="?????? ????????????:" data={person.DeathReason} />
                            <DeadDetailsData
                                title="??????????:"
                                data={person.IsDeleted ? "??????" : "????"}
                            />
                            <DeadDetailsData
                                title="??????????:"
                                data={
                                    <Chip
                                        label={person.IsCitizen ? "??????" : "????"}
                                        // color={person.IsCitizen ? "info" : "default"}
                                        color={"success"}
                                        disabled={!person.IsCitizen}
                                        sx={{ width: 60, fontSize: 21 }}
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={0} md={0} lg={2} />
                        <Grid item xs={12} sm={12} md={6} lg={5}>
                            <DeadDetailsData title="??????????????:" data={person.CemeteryName} />
                            <DeadDetailsData title="?????????? ??????????????:" data={person.CemeteryAddress} />
                            <DeadDetailsData title="?????? ????????????:" data={person.SquareNumber} />
                            <DeadDetailsData title="?????? ????????:" data={person.RowNumber} />
                            <DeadDetailsData title="?????? ????????????:" data={person.ColumnNumber} />
                            <DeadDetailsData
                                title="?????? ??????????????:"
                                data={person.RegistrationNumber}
                            />
                            <DeadDetailsData
                                title="????????:"
                                data={
                                    <Chip
                                        label={person.IsActive ? "??????" : "????"}
                                        // color={person.IsActive ? "success" : "default"}
                                        color={"info"}
                                        disabled={!person.IsActive}
                                        sx={{
                                            width: 60,
                                            color: "#FFFFFF",
                                            fontSize: 21,
                                        }}
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={12} mt={5}>
                            <Typography variant="h4" align="center">
                                ???????? ??????????????
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardMedia component="div" title="???????? ??????????????" sx={{ mb: 5, mt: 0 }}>
                    {!isLoaded ? (
                        <CircularProgress size={20} colo="info" />
                    ) : (
                        <GoogleMap
                            zoom={10}
                            center={{
                                lat: person.CemeteryLocationLat,
                                lng: person.CemeteryLocationLong,
                            }}
                            mapContainerStyle={{
                                width: "fit",
                                height: 500,
                            }}
                        >
                            <Marker
                                position={{
                                    lat: person.CemeteryLocationLat,
                                    lng: person.CemeteryLocationLong,
                                }}
                            />
                        </GoogleMap>
                    )}
                </CardMedia>
            </Card>
        </Container>
    );
};

export default DeadDetails;
