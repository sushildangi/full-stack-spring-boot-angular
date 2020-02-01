package com.luv2tech.config;

import com.luv2tech.entity.Product;
import com.luv2tech.entity.ProductCategory;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        HttpMethod[] unsupportedAction = {
                HttpMethod.DELETE, HttpMethod.POST,
                HttpMethod.PUT, HttpMethod.HEAD, HttpMethod.PATCH, HttpMethod.TRACE
        };
        config.getExposureConfiguration()
                .forDomainType(Product.class)
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(unsupportedAction)))
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(unsupportedAction)));
        config.getExposureConfiguration()
                .forDomainType(ProductCategory.class)
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(unsupportedAction)))
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(unsupportedAction)));
    }
}
