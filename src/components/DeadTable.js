import { MoreHoriz, MoreVert } from "@mui/icons-material";
import {
    CircularProgress,
    Link,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TableSortLabel,
    Tooltip,
    Typography,
} from "@mui/material";
import deadService from "config/axios/deadServices";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { setDead, setDeadLoading, setOrderBy, setSortBy } from "redux/slices/deadSlice";
import Center from "./khadamat/Center";

const tableHeads = [
    {
        id: "NameFl",
        label: "الاسم",
        align: "center",
    },
    {
        id: "AgeYears",
        label: "العمر",
        align: "center",
    },
    {
        id: "CemeteryName",
        label: "المقبرة",
        align: "center",
    },
    {
        id: "CemeteryAddress",
        label: "عنوان المقبرة",
        align: "center",
    },
    {
        id: "DateOfDeath",
        label: "تاريخ الوفاة",
        align: "center",
    },
    {
        id: "DeathTime",
        label: "وقت الوفاة",
        align: "center",
    },
    {
        id: "DeathReason",
        label: "سبب الوفاة",
        align: "center",
    },
    {
        id: "GenderTypeName",
        label: "النوع",
        align: "center",
    },
    {
        id: "NationalityName",
        label: "الجنسية",
        align: "center",
    },
    {
        id: "NationalNumber",
        label: "رقم الهوية",
        align: "center",
    },
];

const DeadTable = () => {
    // const [orderBy, setOrderBy] = useState("");
    // const [sortDirection, setSortDirection] = useState("asc");
    const dispatch = useDispatch();
    const { dead, orderBy, sortBy, deadLoading } = useSelector((state) => state.dead);

    useEffect(() => {
        (async () => {
            const { data: deadData } = await deadService.searchDead();
            dispatch(setDead(deadData.PagedList));
            console.log({ deadData });
        })();
    }, []);

    const handleOrderBy = async (field) => {
        try {
            dispatch(setDeadLoading(true));
            if (sortBy === field) {
                if (orderBy === 1) {
                    dispatch(setOrderBy(0));
                } else {
                    dispatch(setOrderBy(1));
                }
            } else {
                dispatch(setSortBy(field));
                dispatch(setOrderBy(1));
            }

            const { data: sortedDead } = await deadService.searchDead();

            dispatch(setDead(sortedDead.PagedList));
            console.log({ sortedDead });
        } catch (err) {
            console.log({ err });
            setDeadLoading(false);
        }
    };

    return (
        <TableContainer sx={{ height: 850 }}>
            <Table>
                <thead>
                    <TableRow>
                        {tableHeads.map((head) => (
                            <TableCell
                                align={head.align || "center"}
                                key={head.id}
                                sortDirection={orderBy ? "asc" : "desc"}
                            >
                                <TableSortLabel
                                    sx={{ width: "max-content" }}
                                    onClick={() => handleOrderBy(head.id)}
                                    direction={
                                        sortBy === head.id ? (orderBy ? "asc" : "desc") : "desc"
                                    }
                                >
                                    <Typography variant="h5">{head.label}</Typography>
                                </TableSortLabel>
                            </TableCell>
                        ))}
                    </TableRow>
                </thead>
                {deadLoading ? (
                    <TableBody>
                        <TableRow sx={{ height: 700 }}>
                            <TableCell colSpan={10}>
                                <Center>
                                    <CircularProgress size={60} color="info" />
                                </Center>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                ) : (
                    <TableBody>
                        {dead.map(
                            ({
                                Id,
                                NameFl,
                                AgeYears,
                                AgeMonths,
                                AgeDays,
                                CemeteryName,
                                CemeteryAddress,
                                DateOfDeath,
                                DeathTime,
                                DeathReason,
                                GenderTypeName,
                                NationalityName,
                                NationalNumber,
                            }) => (
                                <TableRow hover key={Id}>
                                    <Tooltip title="التفاصيل">
                                        <TableCell align="center">
                                            <Link component={RouterLink} underline="hover" to="#">
                                                {NameFl.trim()}
                                            </Link>
                                        </TableCell>
                                    </Tooltip>

                                    <Tooltip
                                        title={`${AgeYears} سنة / ${AgeMonths} أشهر / ${AgeDays} أيام`}
                                    >
                                        <TableCell align="center">{AgeYears} سنة</TableCell>
                                    </Tooltip>

                                    <Tooltip title={CemeteryName}>
                                        <TableCell align="center">{CemeteryName}</TableCell>
                                    </Tooltip>

                                    <Tooltip title={CemeteryAddress}>
                                        <TableCell align="center">{CemeteryAddress}</TableCell>
                                    </Tooltip>

                                    <Tooltip title={DateOfDeath.split("T")[0]}>
                                        <TableCell align="center">
                                            {DateOfDeath.split("T")[0]}
                                        </TableCell>
                                    </Tooltip>

                                    <Tooltip title={DeathTime}>
                                        <TableCell align="center">{DeathTime}</TableCell>
                                    </Tooltip>

                                    <Tooltip title={DeathReason}>
                                        <TableCell align="center">{DeathReason}</TableCell>
                                    </Tooltip>

                                    <Tooltip title={GenderTypeName}>
                                        <TableCell align="center">{GenderTypeName}</TableCell>
                                    </Tooltip>

                                    <Tooltip title={NationalityName}>
                                        <TableCell align="center">{NationalityName}</TableCell>
                                    </Tooltip>

                                    <Tooltip title={NationalNumber}>
                                        <TableCell align="center">{NationalNumber}</TableCell>
                                    </Tooltip>

                                    <Tooltip title={"الاجراءات"}>
                                        <TableCell align="center">
                                            <MoreVert />
                                        </TableCell>
                                    </Tooltip>
                                </TableRow>
                            )
                        )}
                    </TableBody>
                )}
            </Table>
        </TableContainer>
    );
};

export default DeadTable;
