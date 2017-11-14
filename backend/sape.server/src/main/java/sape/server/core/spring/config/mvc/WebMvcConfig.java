package sape.server.core.spring.config.mvc;

import java.io.IOException;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.util.UrlPathHelper;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

/**
 * Implementação de de configuração do spring, substitui beans.xml
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@EnableWebMvc
@Configuration
@ComponentScan("sape.server")
public class WebMvcConfig extends WebMvcConfigurerAdapter{

	/**
	 * {@inheritDoc}
	 */
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
				.allowedOrigins("*")
				.allowedMethods("*")
				.allowedHeaders("*")
				.allowCredentials(false)
				.maxAge(3600);
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
    public void configurePathMatch(PathMatchConfigurer configurer) {
        UrlPathHelper urlPathHelper = new UrlPathHelper();
        urlPathHelper.setRemoveSemicolonContent(false);
        configurer.setUrlPathHelper(urlPathHelper);
    }

	@Bean
    @Primary
    public ObjectMapper objectMapper() {
        SimpleModule module = new SimpleModule();
        module.addSerializer(LocalDate.class, new LocalDateSerializer());
        module.addDeserializer(LocalDate.class, new LocalDateDeserializer());
        module.addSerializer(LocalDateTime.class, new LocalDateTimeSerializer());
        module.addDeserializer(LocalDateTime.class, new LocalDateTimDeserializer());
        module.addSerializer(Timestamp.class, new TimestampSerializer());
        module.addDeserializer(Timestamp.class, new TimestampDeserializer());

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.findAndRegisterModules();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.registerModule(module);

        objectMapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        objectMapper.configure(MapperFeature.IGNORE_DUPLICATE_MODULE_REGISTRATIONS, true);
        objectMapper.configure(MapperFeature.USE_ANNOTATIONS, true);
        objectMapper.configure(MapperFeature.USE_GETTERS_AS_SETTERS, true);
        return objectMapper;
    }

	/**
	 * {@inheritDoc}
	 */
	@Override
	public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
		super.configureMessageConverters(converters);
		ObjectMapper objectMapper = objectMapper();
		MappingJackson2HttpMessageConverter jackson2HttpMessageConverter = new MappingJackson2HttpMessageConverter(objectMapper);
        converters.add(jackson2HttpMessageConverter);
	}

	public class LocalDateSerializer extends JsonSerializer<LocalDate> {

		/**
		 * {@inheritDoc}
		 */
		@Override
		public void serialize(LocalDate value, com.fasterxml.jackson.core.JsonGenerator gen, SerializerProvider serializers) throws IOException {
			gen.writeString(value.format(DateTimeFormatter.ISO_DATE));

		}

	}

	public class LocalDateDeserializer extends JsonDeserializer<LocalDate> {

		/**
		 * {@inheritDoc}
		 */
		@Override
		public LocalDate deserialize(JsonParser p, DeserializationContext ctxt)	throws IOException, com.fasterxml.jackson.core.JsonProcessingException {
			try {
				return LocalDate.parse(p.getValueAsString(), DateTimeFormatter.ISO_DATE);
			} catch (Exception e) {
				try {
					return LocalDate.parse(p.getValueAsString(), DateTimeFormatter.ISO_DATE_TIME);
				} catch (Exception e2) {
					return LocalDate.parse(p.getValueAsString(), DateTimeFormatter.ISO_LOCAL_DATE);
				}
			}
		}
	}

	public class LocalDateTimeSerializer extends JsonSerializer<LocalDateTime> {

		/**
		 * {@inheritDoc}
		 */
		@Override
		public void serialize(LocalDateTime value, com.fasterxml.jackson.core.JsonGenerator gen, SerializerProvider serializers) throws IOException {
			gen.writeString(value.format(DateTimeFormatter.ISO_DATE_TIME));
		}
	}

	public class LocalDateTimDeserializer extends JsonDeserializer<LocalDateTime> {

		/**
		 * {@inheritDoc}
		 */
		@Override
		public LocalDateTime deserialize(JsonParser p, DeserializationContext ctxt)	throws IOException, com.fasterxml.jackson.core.JsonProcessingException {
			try {
				return LocalDateTime.parse(p.getValueAsString(), DateTimeFormatter.ISO_DATE_TIME);
			} catch (Exception e) {
				try {
					return LocalDateTime.parse(p.getValueAsString(), DateTimeFormatter.ISO_LOCAL_DATE_TIME);
				} catch (Exception e2) {
					return LocalDateTime.parse(p.getValueAsString(), DateTimeFormatter.ISO_INSTANT);
				}
			}
		}
	}

	public class TimestampSerializer extends JsonSerializer<Timestamp> {

		/**
		 * {@inheritDoc}
		 */
		@Override
		public void serialize(Timestamp value, com.fasterxml.jackson.core.JsonGenerator gen, SerializerProvider serializers) throws IOException {
			gen.writeString(value.toInstant().toString());
		}
	}

	public class TimestampDeserializer extends JsonDeserializer<Timestamp> {

		/**
		 * {@inheritDoc}
		 */
		@Override
		public Timestamp deserialize(JsonParser p, DeserializationContext ctxt)	throws IOException, com.fasterxml.jackson.core.JsonProcessingException {
			try {
				return Timestamp.valueOf(LocalDateTime.parse(p.getValueAsString(), DateTimeFormatter.ISO_LOCAL_DATE_TIME).withNano(0));
			} catch (Exception e) {
				try {
					return Timestamp.valueOf(LocalDateTime.parse(p.getValueAsString(), DateTimeFormatter.ISO_DATE_TIME).withNano(0));
				} catch (Exception e2) {
					return Timestamp.valueOf(LocalDateTime.parse(p.getValueAsString(), DateTimeFormatter.ISO_INSTANT).withNano(0));
				}
			}
		}
	}
}