package com.sox.server.session;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;

import java.util.Random;
import java.util.concurrent.TimeUnit;

public class SessionManager
{
    private static Cache<String, String> sessionToUser = CacheBuilder.newBuilder().expireAfterAccess(2, TimeUnit.HOURS).build();

    public static String createSession(String email)
    {
        String session = Long.toString(new Random().nextLong());
        sessionToUser.put(session, email);

        return session;
    }

    public static String get(String session)
    {
        return sessionToUser.getIfPresent(session);
    }
}
