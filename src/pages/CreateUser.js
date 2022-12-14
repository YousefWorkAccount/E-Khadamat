import { LoadingButton } from "@mui/lab";
import {
    Checkbox,
    Container,
    Divider,
    FormControlLabel,
    Grid,
    Paper,
    Stack,
    Typography
} from "@mui/material";
import InputField from "components/khadamat/InputField";
import JobsAutoComplete from "components/khadamat/JobsAutoComplete";
import ManagerAutoComplete from "components/khadamat/ManagerAutoComplete";
import RolesAutoComplete from "components/khadamat/RolesAutoComplete";
import MDButton from "components/MDButton";
import usersService from "config/axios/usersService";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateUser = () => {
    const [managers, setManagers] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        control,
        setValue,
    } = useForm({
        mode: "onTouched",
    });

    const watchIsCompany = watch("isCompany");
    const watchJob = watch("job");

    const handleCreateUser = async (data) => {
        setLoading(true);
        try {
            const { confirmPassword, roles, job, manager, ...userData } = data;
            const securityRolesList = roles.map((role) => role.Key);
            console.log({
                ...userData,
                securityRolesList,
                securityUserJobId: job.Key,
                managerId: managers.length ? manager.Key : "",
                companyName: userData.isCompany ? userData.companyName : "",
            });
            const addUserRes = await usersService.addUser({
                ...userData,
                securityRolesList,
                securityUserJobId: job.Key,
                managerId: managers.length ? manager.Key : "",
                companyName: userData.isCompany ? userData.companyName : "",
            });

            navigate("/users");
            toast.success("???? ?????????? ???????????????? ??????????");
        } catch (err) {
            console.log({ err });
            toast.error(err.response.data.Message ?? "?????? ?????? ?????? ????");
        }
        setLoading(false);
    };

    return (
        <Container
            component={Paper}
            elevation={10}
            maxWidth="xl"
            sx={{ py: 10, my: 5, mx: "auto", borderRadius: 10 }}
        >
            <Grid
                container
                spacing={{ xs: 1, sm: 2, lg: 3 }}
                m="auto"
                component="form"
                onSubmit={handleSubmit(handleCreateUser)}
            >
                <Grid item xs={12}>
                    <Typography variant="h1" gutterBottom align="center">
                        ???????????? ????????
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h3" gutterBottom>
                        ???????????????? ??????????????
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <InputField
                        fullWidth
                        label="?????????? ???????????????? *"
                        type="text"
                        {...register("nameFl", {
                            required: true,
                        })}
                        error={!!errors.nameFl}
                        helperText={errors.nameFl?.message}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <InputField
                        fullWidth
                        label="?????????? ?????????????????????? *"
                        type="text"
                        {...register("nameSl")}
                        error={!!errors.nameSl}
                        helperText={errors.nameSl?.message}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <InputField
                        fullWidth
                        label="?????? ???????????? *"
                        type="number"
                        {...register("mobile", {
                            required: true,
                            maxLength: {
                                value: 12,
                                message: "?????? ???????????? ?????????? ???? 12 ??????",
                            },
                            minLength: {
                                value: 12,
                                message: "?????? ???????????? ?????????? ???? 12 ??????",
                            },
                        })}
                        error={!!errors.mobile}
                        helperText={errors.mobile?.message}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <InputField
                        fullWidth
                        label="?????? ???????????? *"
                        type="number"
                        {...register("nationalNumber", {
                            required: true,
                            maxLength: {
                                message: "?????? ???????????? ?????????? ???? 10 ??????????",
                                value: 10,
                            },
                            minLength: {
                                message: "?????? ???????????? ?????????? ???? 10 ??????????",
                                value: 10,
                            },
                            pattern: {
                                message: "?????? ???? ???????? ?????? ???????????? ?? 1 ???? 2",
                                value: /^1|^2\d*/,
                            },
                        })}
                        error={!!errors.nationalNumber}
                        helperText={errors.nationalNumber?.message}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <InputField
                        fullWidth
                        label="???????????? ???????????????????? *"
                        type="email"
                        {...register("email", {
                            required: true,
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <InputField
                        fullWidth
                        label="?????????? ??????????????"
                        type="number"
                        {...register("jobNumber", {
                            maxLength: {
                                message: "?????????? ?????????????? ?????????? ???? 8 ??????",
                                value: 8,
                            },
                            minLength: {
                                message: "?????????? ?????????????? ?????????? ???? 8 ??????",
                                value: 8,
                            },
                        })}
                        error={!!errors.jobNumber}
                        helperText={errors.jobNumber?.message}
                    />
                </Grid>

                <Grid item xs={6}>
                    <JobsAutoComplete
                        control={control}
                        setManagers={setManagers}
                        setValue={setValue}
                    />
                </Grid>

                <Grid item xs={6}>
                    <RolesAutoComplete control={control} />
                </Grid>

                <Grid item xs={6} display={!managers.length ? "none" : ""}>
                    <ManagerAutoComplete managers={managers} control={control} />
                </Grid>

                <Grid item xs={4} sm={2} md={2} lg={1}>
                    <FormControlLabel
                        label={
                            <Typography display={"inline"} variant="subtitle1">
                                ????????
                            </Typography>
                        }
                        control={<Checkbox {...register("isActive")} />}
                    />
                </Grid>

                <Grid item xs={6} />

                <Grid item xs={4} sm={2} md={2}>
                    <FormControlLabel
                        label={
                            <Typography display="inline" variant="subtitle1">
                                ???????? ???????? ??
                            </Typography>
                        }
                        control={<Checkbox {...register("isCompany")} />}
                    />
                </Grid>

                <Grid item xs={6} display={!watchIsCompany && "none"}>
                    <InputField
                        fullWidth
                        label="?????? ????????????"
                        type="text"
                        {...register("companyName")}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Divider sx={{ background: "black" }} />
                </Grid>

                <Grid item xs={12}>
                    <Typography variant="h3">???????????? ????????????</Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <InputField
                        fullWidth
                        label="?????? ???????????????? *"
                        type="text"
                        {...register("username", {
                            required: true,
                        })}
                        error={!!errors.username}
                        helperText={errors.username?.message}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <InputField
                        fullWidth
                        label="???????? ???????????? *"
                        type="password"
                        {...register("password", {
                            required: true,
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <InputField
                        fullWidth
                        label="?????????? ???????? ???????????? *"
                        type="password"
                        {...register("confirmPassword", {
                            required: true,
                            validate: (val) => {
                                return val === watch("password") || "???? ???????????? ???? ???????? ????????????";
                            },
                        })}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Divider sx={{ background: "black" }} />
                </Grid>

                <Grid item xs={12}>
                    <Stack direction="row" spacing={5} justifyContent="space-between">
                        <LoadingButton
                            loading={loading}
                            color="success"
                            type="submit"
                            variant="contained"
                            fullWidth
                        >
                            ??????????
                        </LoadingButton>

                        <MDButton
                            component={Link}
                            to="/users"
                            variant="gradient"
                            fullWidth
                            color="error"
                        >
                            ??????????
                        </MDButton>
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    );
};

export default CreateUser;
