export const getGoogleUser = async (accessToken:string) => {
        const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo",
            {
                headers: { "Authorization": `Bearer ${accessToken}` },
            });
        return await response.json()
    };