import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import {
    login,
    logout,
    getNewAccessAndCsrfToken,
    processAccountEmailVerify,
    processPasswordSetup,
    processResendEmailVerification,
    processResendPwdSetupLink,
    processPwdReset,
} from "./auth-service";
import {
    setAccessTokenCookie,
    setCsrfTokenCookie,
    setAllCookies,
    clearAllCookies,
} from "../../cookie";

export const handleLogin = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    const { accessToken, refreshToken, csrfToken, accountBasic } = await login(username, password);

    clearAllCookies(res);
    setAllCookies(res, accessToken, refreshToken, csrfToken);

    res.json(accountBasic);
});

export const handleLogout = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { refreshToken } = req.cookies;

    const message = await logout(refreshToken);
    clearAllCookies(res);

    res.status(204).json(message);
});

export const handleTokenRefresh = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { refreshToken } = req.cookies;

    const { accessToken, csrfToken, message } = await getNewAccessAndCsrfToken(refreshToken);
    res.clearCookie("accessToken");
    res.clearCookie("csrfToken");

    setAccessTokenCookie(res, accessToken);
    setCsrfTokenCookie(res, csrfToken);

    res.json(message);
});

export const handleAccountEmailVerify = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id } = req.user!;
    const message = await processAccountEmailVerify(id);
    res.json(message);
});

export const handleAccountPasswordSetup = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { id: userId } = req.user!;
    const { username: userEmail, password } = req.body;
    const message = await processPasswordSetup({ userId, userEmail, password });
    res.json(message);
});

export const handleResendEmailVerification = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.body;
    const message = await processResendEmailVerification(userId);
    res.json(message);
});

export const handleResendPwdSetupLink = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.body;
    const message = await processResendPwdSetupLink(userId);
    res.json(message);
});

export const handlePwdReset = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.body;
    const message = await processPwdReset(userId);
    res.json(message);
});
