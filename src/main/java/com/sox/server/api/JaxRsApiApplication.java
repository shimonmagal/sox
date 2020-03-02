package com.sox.server.api;

import com.sox.server.api.auth.AuthenticationFilter;
import com.sox.server.api.auth.LoginApi;
import com.sox.server.api.report.Report;

import javax.ws.rs.core.Application;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class JaxRsApiApplication extends Application {
    private final Set<Class<?>> classes;

    public JaxRsApiApplication() {
        Set<Class<?>> c = new HashSet<Class<?>>();

        c.add(AuthenticationFilter.class);
        c.add(LoginApi.class);

        c.add(Report.class);

        classes = Collections.unmodifiableSet(c);
    }

    @Override
    public Set<Class<?>> getClasses() {
        return classes;
    }
}