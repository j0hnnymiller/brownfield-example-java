package co.devskills.springbootboilerplate;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(PingController.class)
class PingControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void healthCheck_shouldReturnPong() throws Exception {
        mockMvc.perform(get("/ping"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.valueOf("text/plain;charset=UTF-8")))
                .andExpect(content().string("pong"));
    }

    @Test
    void healthCheck_shouldReturn200StatusCode() throws Exception {
        mockMvc.perform(get("/ping"))
                .andExpect(status().isOk());
    }

    @Test
    void healthCheck_shouldReturnTextContent() throws Exception {
        mockMvc.perform(get("/ping"))
                .andExpect(content().contentTypeCompatibleWith(MediaType.TEXT_PLAIN));
    }

    @Test
    void healthCheck_shouldNotReturnEmptyResponse() throws Exception {
        mockMvc.perform(get("/ping"))
                .andExpect(content().string(org.hamcrest.Matchers.not(org.hamcrest.Matchers.emptyString())));
    }
}
