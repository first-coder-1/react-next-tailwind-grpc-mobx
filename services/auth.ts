import {
    AuthenticationDetails,
    CognitoUserPool,
    CognitoUser,
    CognitoRefreshToken,
    CognitoUserSession
} from "amazon-cognito-identity-js";

type UserPoolData = { UserPoolId: string; ClientId: string };

type RefreshSessionResponse = {
    sessionValid: boolean;
    idToken?: string;
    refreshToken?: string;
};

export class Auth {
    private cognitoUser: any;
    private poolData: UserPoolData;

    constructor(userPool: UserPoolData) {
        this.poolData = userPool;
    }

    signin(username: string, password: string): Promise<{ idToken: string; refreshToken: string }> {
        const authData = {
            Username: username,
            Password: password,
        };

        const userData = {
            Username: username,
            Pool: new CognitoUserPool(this.poolData),
        };

        this.cognitoUser = new CognitoUser(userData);
        const authenticationDetails = new AuthenticationDetails(authData);

        return new Promise((resolve, reject) => {
            this.cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: (result: any) => {
                    const idToken = result.idToken.jwtToken;
                    const refreshToken = result.refreshToken.token;
                    resolve({ idToken, refreshToken });
                },

                onFailure: (err: any) => {
                    console.error(err);
                    let code = 0;
                    switch (err.code) {
                        case "UserNotFoundException":
                        case "NotAuthorizedException":
                            code = 1;
                            break;
                        case "InvalidParameterException":
                            code = 2;
                            break;
                    }
                    // reject({ error: err, code }); retorno original
                    reject(new Error(err.message));
                },

                newPasswordRequired: (_: any) => {
                    // reject({ error: new Error("New password required"), code: 3 }); retorno original
                    reject(new Error("New password required"));

                },
            });
        });
    }

    async refreshSession(username: string, refreshToken: string): Promise<RefreshSessionResponse> {
        this.cognitoUser ??= new CognitoUser({
            Username: username,
            Pool: new CognitoUserPool(this.poolData),
        });
        const token = new CognitoRefreshToken({ RefreshToken: refreshToken });

        return new Promise((resolve, reject) => {
            this.cognitoUser.refreshSession(token, (err: any, result: any) => {
                if (result) {
                    resolve({
                        sessionValid: true,
                        idToken: result.idToken.jwtToken,
                        refreshToken: result.refreshToken.token,
                    });
                } else {
                    console.error("Error refreshing session:", err);
                    resolve({
                        sessionValid: false
                    });
                }
            });
        });
    }

    signout() {
        this.cognitoUser?.signOut();
    }

    setNewPassword(username: string, password: string): Promise<{ idToken: string; refreshToken: string }> {
        return new Promise((resolve, reject) => {
            this.cognitoUser ??= new CognitoUser({
                Username: username,
                Pool: new CognitoUserPool(this.poolData),
            });

            this.cognitoUser.completeNewPasswordChallenge(password, {}, {
                onSuccess: (result: any) => {
                    resolve({
                        idToken: result.idToken.jwtToken,
                        refreshToken: result.refreshToken.token,
                    });
                },
                onFailure: (err: any) => {
                    var code = 0;
                    switch (err.code) {
                        case "UserNotFoundException":
                        case "NotAuthorizedException":
                            code = 1;
                            break;
                        case "InvalidParameterException":
                            code = 2;
                            break;
                        case "InvalidPasswordException":
                            code = 6;
                            break;
                    }
                    reject(code);
                },
            });
        });
    }

    forgotPassword(username: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.cognitoUser = new CognitoUser({
                Username: username,
                Pool: new CognitoUserPool(this.poolData),
            });

            this.cognitoUser.forgotPassword({
                onSuccess: (data: any) => {
                    resolve();
                },
                onFailure: (err: any) => {
                    console.error(err);
                    switch (err.code) {
                        case "NotAuthorizedException":
                            reject("EXPIRED");
                            break;
                        case "UserNotFoundException":
                            reject(9);
                            break;
                        default:
                            reject(7);
                            break;
                    }
                },
            });
        });
    }

    confirmPassword(username: string, code: string, password: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.cognitoUser = new CognitoUser({
                Username: username,
                Pool: new CognitoUserPool(this.poolData),
            });

            this.cognitoUser.confirmPassword(code, password, {
                onSuccess: () => {
                    resolve();
                },
                onFailure: (err: any) => {
                    console.error(err);
                    switch (err.code) {
                        case "CodeMismatchException":
                            reject(new Error('Código de verificação inválido fornecido, tente novamente.'));
                            break;
                        case "ExpiredCodeException":
                            reject(new Error('Código expirado. Solicitar novamente na página anterior.'));
                            break;
                        default:
                            reject(new Error('Erro desconhecido ao confirmar senha.'));
                            break;
                    }
                },
            });
        });
    }

    // Dentro do auth.ts
    checkSession(username: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const user = new CognitoUser({
                Username: username,
                Pool: new CognitoUserPool(this.poolData),
            });

            user.getSession((error: Error | null, session: CognitoUserSession | null) => {
                if (session && !error) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    }
}

