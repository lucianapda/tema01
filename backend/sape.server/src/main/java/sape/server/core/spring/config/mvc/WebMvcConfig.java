package sape.server.core.spring.config.mvc;

import java.io.IOException;
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
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

/**
 * Implementação de de configuração do spring, substitui beans.xml
 *
 * @author Guilherme Dalmarco (dalmarco.gd@gmail.com)
 */
@Configuration
@EnableWebMvc
@ComponentScan("sape.server")
public class WebMvcConfig extends WebMvcConfigurerAdapter{

	@Bean
    @Primary
    public ObjectMapper objectMapper() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.findAndRegisterModules();
        JavaTimeModule javaTimeModule = new JavaTimeModule();
        javaTimeModule.addSerializer(LocalDate.class, new LocalDateSerializer());
        javaTimeModule.addDeserializer(LocalDate.class, new LocalDateDeserializer());
        javaTimeModule.addSerializer(LocalDateTime.class, new LocalDateTimeSerializer());
        javaTimeModule.addDeserializer(LocalDateTime.class, new LocalDateTimDeserializer());

        objectMapper.registerModule(javaTimeModule);
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
			gen.writeString(value.format(DateTimeFormatter.ISO_LOCAL_DATE));

		}

	}

	public class LocalDateDeserializer extends JsonDeserializer<LocalDate> {

		/**
		 * {@inheritDoc}
		 */
		@Override
		public LocalDate deserialize(JsonParser p, DeserializationContext ctxt)	throws IOException, com.fasterxml.jackson.core.JsonProcessingException {
			return LocalDate.parse(p.getValueAsString(), DateTimeFormatter.ISO_LOCAL_DATE);
		}
	}

	public class LocalDateTimeSerializer extends JsonSerializer<LocalDateTime> {

		/**
		 * {@inheritDoc}
		 */
		@Override
		public void serialize(LocalDateTime value, com.fasterxml.jackson.core.JsonGenerator gen, SerializerProvider serializers) throws IOException {
			gen.writeString(value.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));

		}

	}

	public class LocalDateTimDeserializer extends JsonDeserializer<LocalDateTime> {

		/**
		 * {@inheritDoc}
		 */
		@Override
		public LocalDateTime deserialize(JsonParser p, DeserializationContext ctxt)	throws IOException, com.fasterxml.jackson.core.JsonProcessingException {
			return LocalDateTime.parse(p.getValueAsString(), DateTimeFormatter.ISO_LOCAL_DATE_TIME);
		}
	}
}